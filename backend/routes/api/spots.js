const express = require('express');
const {Spot,Review,SpotImage} = require('../../db/models');

const router =express.Router();
/* helper function */
const findAvg = (reviewArr) =>{
   const sum = reviewArr.reduce((acc,obj) => obj.stars += acc)
   return sum/ reviewArr.length

}

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

})


module.exports = router;
