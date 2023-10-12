const express = require('express');
const {Spot,Review,SpotImage} = require('../../db/models');
const {requireAuth} = require('../../utils/auth');
const { check } = require('express-validator');
const {handleSignupValidation, handleCreateErrors} = require('../../utils/validation');
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

router.post('/',requireAuth,validateSpot,handleCreateErrors, async(req,res) =>{
    // requireAuth(req);
    let obj = req.body
    let createdSpot = await Spot.create(obj);

    res.json(createdSpot)
})


module.exports = router;
