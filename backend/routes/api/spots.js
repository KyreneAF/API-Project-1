const express = require('express');
const {Spot,Review,SpotImage,User} = require('../../db/models');
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
    check('stars').notEmpty().isInt({ min: 1, max: 5 }),
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
console.log(spot,'!!!!!')
if(!spot) res.status(404).json({"message": "Spot couldn't be found"})

let newReview = await Review.create({
    userId,
    spotId,
    ...req.body
})
return res.status(201).json(newReview)

})

















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
})


module.exports = router;
