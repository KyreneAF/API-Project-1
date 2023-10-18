const express = require('express');
const {Spot,Review,SpotImage,User,ReviewImage,Booking} = require('../../db/models');
const { check } = require('express-validator');
const {handleSignupValidation, handleCreateErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
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


validateBooking = [
    check("endDate")
      .custom((val, { req }) => {
        const endDate = new Date(val);
        const startDate = new Date(req.body.startDate);
        return endDate.getTime() > startDate.getTime();
      })
      .withMessage("endDate cannot come before startDate")
      .custom((val, { req }) => {
        const endDate = new Date(val);
        const startDate = new Date(req.body.startDate);
        return endDate.getTime() !== startDate.getTime();
      })
      .withMessage("startDate cannot be the same as endDate"),
  ];







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

/* GET ALL REVIEWS OF SPOT */


router.get('/:spotId/reviews', async(req,res) =>{
    let spotId = req.params.spotId;

    let spot = await Spot.findByPk(spotId);

    if(!spot){
        return res.status(404).json({"message": "Spot couldn't be found"})
    }

    const allReviews = await Review.findAll({
        where:{
            spotId,
        },
        include:[{
            model:User,
            attributes:['id','firstName','lastName']
        },{
            model:ReviewImage,
            attributes:['id','url']
        }]
    })

return res.json({Reviews:allReviews})
})















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
    console.log(booking,'!!!!!!!!!')
    return res.json({Bookings:booking})

})







/* GET DETAILS OF SPOT  */
router.get('/:spotId',async(req,res) =>{
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
    // !spot? res.status(404).json({"message": "Spot couldn't be found"}):
    if(!spot) res.status(404).json({"message": "Spot couldn't be found"})
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
router.get('/', async(req,res)=>{
    const allSpots = await Spot.findAll({
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






router.put('/:spotId',requireAuth,validateSpot,handleCreateErrors, async(req,res) =>{
   let spotId = req.params.spotId;
   let oldSpot = await Spot.findByPk(spotId);
   if(req.user.id !== oldSpot.ownerId){
    return res.status(403).json({ "message": "Forbidden" })
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



/* POST REVIEW FOR SPOT   */
router.post('/:spotId/reviews',validateReview,handleCreateErrors, async(req,res) =>{
let spotId = req.params.spotId;
let userId = req.user.id
let spot = await Spot.findByPk(spotId);

if(!spot) res.status(404).json({"message": "Spot couldn't be found"})

let newReview = await Review.create({
    userId,
    spotId,
    ...req.body
})
return res.status(201).json(newReview)

})














/*  POST  BOOKING FOR SPOT    */
// router.post('/:spotId/bookings', requireAuth,validateBooking,handleCreateErrors, async(req,res) =>{
//     let userId = req.user.id;
//     let spotId = req.params.spotId;
//     let {startDate,endDate} = req.body;

//     let spot = await Spot.findByPk(spotId);

//     if (!spot || spot.dataValues.ownerId === req.user.dataValues.id) {
//         const err = new Error("Spot couldn't be found");
//         err.status = 404;
//         err.message = "Spot couldn't be found";
//         return next(err);
//       };



//       let newBooking = await Booking.create({
//         spotId,
//         userId,
//         startDate: format(new Date(startDate), 'yyyy-MM-dd'),
//         endDate: format(new Date(endDate), 'yyyy-MM-dd')
//       })

//     //   console.log(newBooking)
//     return res.json(newBooking)

// })

router.post("/:spotId/bookings",requireAuth,validateBooking,handleCreateErrors,async (req, res, next) => {
      const id = req.params.spotId;

      const { startDate, endDate } = req.body;

      const spot = await Spot.findByPk(id, {
            include: Booking
        });

      if (!spot || spot.dataValues.ownerId === req.user.dataValues.id) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        err.message = "Spot couldn't be found";
        return next(err);
      }

      for (const booking of spot.Bookings) {
        let errors = {};
        let bookingStart = new Date(booking.dataValues.startDate);
        let bookingEnd = new Date(booking.dataValues.endDate);
        let start = new Date(startDate);
        let end = new Date(endDate);

        if (start.getTime() >= bookingStart.getTime() && start.getTime() <= bookingEnd.getTime() ) {
          errors.startDate = "Start date conflicts with an existing booking";
        }
        if (end.getTime() >= bookingStart.getTime() &&end.getTime() <= bookingEnd.getTime()) {
          errors.endDate = "End date conflicts with an existing booking";
        }
        if (start.getTime() <= bookingStart.getTime() &&end.getTime() >= bookingEnd.getTime()) {
          errors.startDate = "Start date conflicts with an existing booking";
          errors.endDate = "End date conflicts with an existing booking";
        }

        if (errors.startDate || errors.endDate) {
          const err = new Error(
            "Sorry, this spot is already booked for the specified dates"
          );
          err.status = 403;
          err.message =
            "Sorry, this spot is already booked for the specified dates";
          err.errors = errors;
          return next(err);
        }
      }

      const newBooking = await Booking.create({
        startDate,
        endDate,
        spotId: Number(id),
        userId: req.user.dataValues.id,
      });

      res.json(newBooking);
    }
  );



/* POST IMAGE FOR SPOT   */

router.post('/:spotId/images', requireAuth, async (req, res) => {

      const spotId = req.params.spotId;
      const spot = await Spot.findByPk(spotId);

      if (!spot) {
        return res.status(404).json({ "message": "Spot couldn't be found" });
      }
      if (spot.ownerId === req.user.id) {
        const createImgSpot = await SpotImage.create({
          spotId,
          ...req.body
        });
        // createImgSpot.toJSON();
        return res.json({
            id:createImgSpot.id,
            spotId,
            url:createImgSpot.url,
            preview:createImgSpot.preview
        });
      } else {
        return res.status(403).json({ "message": "Forbidden" });
      }

  });


/* CREATE A SPOT */
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
