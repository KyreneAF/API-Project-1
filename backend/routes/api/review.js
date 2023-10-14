const express = require('express');
const {Review,ReviewImage} = require('../../db/models');
const { check } = require('express-validator');
const {handleSignupValidation, handleCreateErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router =express.Router();











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
