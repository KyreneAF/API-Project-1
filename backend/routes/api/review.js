const express = require('express');
const {Review,ReviewImage,Spot,User} = require('../../db/models');
const { check } = require('express-validator');
const {handleSignupValidation, handleCreateErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router =express.Router();


router.get('/current',requireAuth, async(req,res) =>{
    let userId = req.user.id;

    let allReviews = await Review.findAll({
        where:{
            userId,
        },
        include:[{
            model:Spot,
            attributes:{exclude:['createdAt','updatedAt','description']}
        },
        {
            model:User,
            attributes:['id','firstName','lastName']

        },
        {
            model:ReviewImage,
            attributes:['id','url']
        }
    ]
    })

//     allReviews.forEach(objs => objs.toJSON())
//     // let allReviewsPojo = allReviews.toJSON();
//     // console.log(allReviews)
//     if(allReviews.ReviewImages){
//      allReviews.ReviewImages.forEach(imgs =>{

//             allReviews.Spots.previewImage = imgs.url

//     })
// }
let reviewPojo = [];

allReviews.forEach(objs =>{
    reviewPojo.push(objs.toJSON())
})
reviewPojo.forEach(obj =>{
    if(obj.ReviewImages){
       obj.ReviewImages.forEach(img =>{
        // console.log(obj.Spot,'!!!!!!!!')
        obj.Spot.previewImage = img.url
       })
    }
})

    return res.json({Reviews:reviewPojo})

})








/* POST IMAGE TO REVIEW    */
router.post('/:reviewId/images',requireAuth,async(req,res) =>{
    let reviewId = req.params.reviewId;
    let userId = req.user.id;
    let review = await Review.findByPk(reviewId,{
        include:[{
            model:ReviewImage
        }]
    });

    if(!review) return res.status(404).json({ "message":"Review couldn't be found"});
    if(userId !== review.userId) return res.status(403).json({ "message": "Forbidden"});

    reviewPojo = review.toJSON();
    console.log(reviewPojo.ReviewImages)
    if(reviewPojo.ReviewImages && reviewPojo.ReviewImages.length >= 10) return res.status(403).json({ "message": "Maximum number of images for this resource was reached"});
   let createdImg = await ReviewImage.create({
        reviewId,
        ...req.body
    })

    return res.json({
        id:createdImg.id,
        url:createdImg.url
    })
})









module.exports = router;
