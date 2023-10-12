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
    const spots = allSpots.map(obj =>{
        obj = obj.toJSON();
        let avgRating = findAvg(obj.Reviews)
        console.log(obj.Reviews.stars,'!!!!!!')
    })

console.log(spots)
    res.json({
        Spots:allSpots
    })
})


// allSpots.forEach( obj => {
//     let count =0
//    let avgRating = 0;
//     if(obj === 'Reviews'){
//         obj.forEach(stars =>{
//             stars.stars += avgRating;
//             count++
//             avgRating /= count
//         })
//         obj.avgRating = avgRating
//         if(obj === 'SpotImages'){
//             if(obj.preview === true){
//                 obj.previewImage = obj.url
//             }
//         }
//     }
// })
module.exports = router;
