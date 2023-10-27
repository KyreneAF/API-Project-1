const express = require('express');
const {Spot,Review,SpotImage,User,ReviewImage,Booking} = require('../../db/models');
const { check } = require('express-validator');
const {handleSignupValidation, handleCreateErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const { Op } = require('sequelize');
const router =express.Router();


const validateSpot = [
    check('address').notEmpty().withMessage('Street address is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('country').notEmpty().withMessage('Country is required'),
    check('lat').notEmpty().isFloat().withMessage('Latitude is not valid'),
    check('lng').notEmpty().isNumeric().isFloat().withMessage('Longitude is not valid'),
    check('name').notEmpty().isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
    check('description').notEmpty().withMessage('Description is required'),
    check('price').notEmpty().withMessage('Price per day is required'),
  ];
const validateReview =[
    check('review').notEmpty().withMessage('Review text is required'),
    check('stars').notEmpty().isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
]


const validateBooking = [
    check('endDate')
      .custom((val, { req }) => {
        const endDate = new Date(val);
        const startDate = new Date(req.body.startDate);
        return endDate.getTime() > startDate.getTime();
      })
      .withMessage('endDate cannot come before startDate')
      .custom((val, { req }) => {
        const endDate = new Date(val);
        const startDate = new Date(req.body.startDate);
        return endDate.getTime() !== startDate.getTime();
      })
      .withMessage('startDate cannot be the same as endDate'),
  ];

const validateQuery =[
    check('page').optional().isInt({min:1,max:10}).withMessage("Page must be greater than or equal to 1"),
    check('size').optional().isInt({min:1,max:20}).withMessage("Size must be greater than or equal to 1"),
    check('minLat').optional().isDecimal().isFloat({min:-90.0}).withMessage("Minimum latitude is invalid"),
    check('maxLat').optional().isDecimal().isFloat({max:90.0}).withMessage("Maximum latitude is invalid"),
    check('minLng').optional().isDecimal().isFloat({max:90.0}).withMessage("Minimum longitude is invalid"),
    check('maxLng').optional().isDecimal().isFloat({max:180.0}).withMessage("Maximum longitude is invalid"),
    check('minPrice').optional().isDecimal().isFloat({min:0.00}).withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice').optional().isDecimal().isFloat({min:0.00}).withMessage("Maximum price must be greater than or equal to 0"),
]




/*  GET ALL SPOTS BY CURRENT USER  */
router.get('/current',requireAuth,async(req,res) =>{
    let userId = req.user.id
    console.log(userId)
    let allSpots = await Spot.findAll({
        where:{
            ownerId:userId
        },
        include:[{
            model:Review,
            attributes:['stars']
        },{
            model:SpotImage,
        }]
    });
    let spotsArr = allSpots.map(spot => spot.toJSON())

    spotsArr.forEach(spot => {
        let sum = 0;

        if (spot.Reviews && spot.Reviews.length > 0) {
            spot.Reviews.forEach(review => {
                sum += review.stars;
            });
            spot.avgRating = sum / spot.Reviews.length;
        } else {
            spot.avgRating = 0;
        }
        delete spot.Reviews
    });

    spotsArr.forEach(spot =>{
        if(!spot.SpotImages) spot.previewImage = 'No preview image'
        else{spot.SpotImages.forEach(img =>{
            if (img.preview === false) spot.previewImage = 'No preview image'
            else if(img.preview === true) spot.previewImage = img.url;
        })
    }
     delete spot.SpotImages;
    })

    res.json({Spots:spotsArr})
});




/* GET ALL BOOKINGS BASED ON SPOT */

router.get('/:spotId/bookings', requireAuth, async(req,res,next) =>{
    const userId = req.user.id;
    const spotId = req.params.spotId;
    let where = {}

    let spot = await Spot.findByPk(spotId);

    if(!spot){
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        err.message = "Spot couldn't be found";
        return next(err);
      }
    if(spot.ownerId === userId){
        where = {
            where:{
                spotId,
            },
            include:[{
                model:User,
                attributes:['id','firstName','lastName']
            }]

    }
    }else if(spot.ownerId !== userId){
        where ={
            where:{
                spotId,
            },
            attributes:['spotId','startDate','endDate']
        }
    }
    let booking = await Booking.findAll(where)

    return res.json({Bookings:booking})

})







/* GET DETAILS OF SPOT  */
router.get('/:spotId',async(req,res, next) =>{
    let spot = await Spot.findByPk(req.params.spotId,{
        include:[{
            model:User,
            attributes:['id','firstName','lastName']
        },
        {
            model:SpotImage,
            attributes:['id','url','preview']

        },{
            model:Review,
            attributes:['stars']
        }]
    })

    if(!spot){
        let err = new Error();
        err.status = 404;
        err.message = "Spot couldn't be found"
        return next(err);
    }


    pojoSpot = spot.toJSON()

    let sum = 0
    pojoSpot.Reviews.forEach(review => sum += review.stars );
    pojoSpot.avgRating = sum/pojoSpot.Reviews.length ;
    pojoSpot.numReviews = pojoSpot.Reviews.length

    let Owner = {
        id:pojoSpot.User.id,
        firstName:pojoSpot.User.firstName,
        lastName:pojoSpot.User.lastName
    }


    let resObj ={
        id:pojoSpot.id,
        ownerId:pojoSpot.ownerId,
        address:pojoSpot.address,
        city:pojoSpot.city,
        state:pojoSpot.state,
        country:pojoSpot.country,
        lat:pojoSpot.lat,
        lng:pojoSpot.lng,
        name:pojoSpot.name,
        description:pojoSpot.description,
        price:pojoSpot.price,
        createdAt:pojoSpot.createdAt,
        updatedAt:pojoSpot.updatedAt,
        numReviews:pojoSpot.numReviews,
        avgRating:pojoSpot.avgRating,
        SpotImages:pojoSpot.SpotImages,
        Owner,

    }

    return res.json(resObj)

})



  /*  GET ALL SPOTS   */
router.get('/', validateQuery, handleCreateErrors, async(req,res,next)=>{

    let {page,size,maxLat,minLat,minLng,maxLng,minPrice,maxPrice} = req.query;

    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page) || page < 1) page = 1;
    if (Number.isNaN(size) || size < 1) size = 20;
    if(page > 10) page = 1;
    if(size > 10) size = 20;

    const allSpots = await Spot.findAll({
        limit: size,
        offset:(page - 1) * size,
        include:[{
            model:Review,
            attributes:['stars']
        },
         {
            model:SpotImage,
            attributes:['preview','url']
         }]
    })

    let spotsArr = allSpots.map(spot => spot.toJSON())

    spotsArr.forEach(spot => {
        let sum = 0;

        if (spot.Reviews && spot.Reviews.length > 0) {
            spot.Reviews.forEach(review => {
                sum += review.stars;
            });
            spot.avgRating = sum / spot.Reviews.length;
        } else {
            spot.avgRating = 0;
        }
        delete spot.Reviews
    });

    spotsArr.forEach(spot =>{
        if(!spot.SpotImages) spot.previewImage = 'No preview image'
        else{spot.SpotImages.forEach(img =>{
            if (img.preview === false) spot.previewImage = 'No preview image'
            else if(img.preview === true) spot.previewImage = img.url;
        })
    }
     delete spot.SpotImages;
    })
    res.json({Spots:spotsArr})

});




/*  Updates and returns an existing spot   */

router.put('/:spotId',requireAuth,validateSpot,handleCreateErrors, async(req,res,next) =>{
   let spotId = req.params.spotId;
   let oldSpot = await Spot.findByPk(spotId);

   if(!oldSpot){
    let err = new Error();
    err.status = 404;
    err.message = "Spot couldn't be found";
    return next(err)
   }



   if(req.user.id !== oldSpot.ownerId){
    let err = new Error();
    err.status = 403;
    err.message = "Forbidden";
    return next(err);

}

    const updatedSpot = await Spot.update(
        {
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            lat: req.body.lat,
            lng: req.body.lng,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        },
        {
            where: {
                id:spotId
            },
        }
    );
      let newSpot = await Spot.findByPk(spotId)

    res.json(newSpot)

})



/* Create a Review for a Spot based on the Spot's id  */
router.post('/:spotId/reviews',requireAuth,validateReview,handleCreateErrors, async(req,res,next) =>{
let spotId = req.params.spotId;
let userId = req.user.id
let spot = await Spot.findByPk(spotId);

if(!spot){
    let err = new Error();
    err.status = 404;
    err.message = "Spot couldn't be found";
    return next(err);
}

let userSpot = await Review.findOne({
    where:{
        userId,
        spotId
    }
})

if(userSpot){
    let err = new Error();
    err.status = 500;
    err.message = "User already has a review for this spot";
    return next(err)
}

let newReview = await Review.create({
    userId,
    spotId,
    ...req.body
})
return res.status(201).json(newReview)

})


/*  Create a Booking from a Spot based on the Spot's id    */

router.post('/:spotId/bookings',requireAuth,validateBooking,handleCreateErrors, async(req,res,next) =>{
    let userId = req.user.id;
    let spotId = req.params.spotId;

    let spot = await Spot.findByPk(spotId);

    if(!spot){
        let err = new Error();
        err.status = 404;
        err.message = "Spot couldn't be found";
        return next(err);
    };

    if(spot.ownerId === userId){
        let err = new Error();
        err.status = 403;
        err.message = "Forbidden";
        return next(err);
    };

    let{startDate,endDate} = req.body;

    let spotBookings = await Booking.findOne({
        where:{
            spotId,
            startDate:{
                [Op.lt]: endDate
            },
            endDate:{
                [Op.gt]: startDate
            }
        }
    });

    if(spotBookings && spotBookings.startDate){
        let errors = {}
        errors.startDate = "Start date conflicts with an existing booking";
        if(spotBookings.endDate){
            errors.endDate = "End date conflicts with an existing booking";
        }
        if(errors.startDate || errors.endDate){
            let err = new Error();
            err.status = 403;
            err.message = "Sorry, this spot is already booked for the specified dates";
            err.errors = errors;
            return next(err)
        }

    }

    let dateOnlySD = startDate.split('T')[0];
    let dateOnlyED = endDate.split('T')[0];

   let newBooking = await Booking.create({
    spotId:parseInt(spotId),
    userId,
    startDate,
    endDate,
   });

 let resultObj = {
    id:newBooking.id,
    spotId:newBooking.spotId,
    userId:newBooking.userId,
    startDate:dateOnlySD,
    endDate:dateOnlyED
 }

   return res.json(resultObj)


});






/* Add an Image to a Spot based on the Spot's id   */

router.post('/:spotId/images', requireAuth, async (req, res,next) => {

      const spotId = req.params.spotId;
      const spot = await Spot.findByPk(spotId);

      if (!spot) {
        let err = new Error();
        err.status = 404;
        err.message = "Spot couldn't be found";
        return next(err);

      }


      if (spot.ownerId === req.user.id) {
        const createImgSpot = await SpotImage.create({
          spotId,
          ...req.body
        });

        return res.json({
            id:createImgSpot.id,
            url:createImgSpot.url,
            preview:createImgSpot.preview
        });
      } else {
        let err = new Error();
        err.status = 403;
        err.message = "Forbidden";
        return next(err);

      }

  });





/* create a spot */
router.post('/',requireAuth,validateSpot,handleCreateErrors, async(req,res) =>{
    // requireAuth(req);
    let obj = req.body
    let createdSpot = await Spot.create({
        ownerId:req.user.id,
        ...req.body
    });

    res.status(201).json(createdSpot)
});




/*  DELETE SPOT     */

router.delete('/:spotId', requireAuth, async(req,res,next) =>{
    const userId = req.user.id;
    const spotId = req.params.spotId;

    let spot = await Spot.findByPk(spotId);

    if(!spot){
        let err = new Error();
        err.status = 404;
        err.message = "Spot couldn't be found";
        return next(err)
    };

    if(spot.ownerId !== userId){
        let err = new Error();
        err.status = 404;
        err.message = "Forbidden";
        return next(err)
    };

    spot.destroy();

    return res.json({"message":"Successfully deleted"})
})








module.exports = router;
