const express = require('express');
const {requireAuth} = require('../../utils/auth');
const {ReviewImage,Review} = require('../../db/models');
const { check } = require('express-validator');
const {handleSignupValidation, handleCreateErrors} = require('../../utils/validation');
const router = express.Router();


router.delete('/:imageId', requireAuth, async(req,res,next) =>{
    const imageId = req.params.imageId;
    const userId = req.user.id;

    let reviewImage = await ReviewImage.findByPk(imageId);

    if(!reviewImage){
        let err = new Error();
        err.status = 404;
        err.message = "Spot Image couldn't be found"
        return next(err)
    }

    let reviewId = reviewImage.reviewId;


    const review = await Review.findOne({
        where:{
            id:reviewId
        }
    })


    if(review.userId !== userId){
        let err = new Error();
        err.status = 403;
        err.message = "Forbidden"
        return next(err)
    }

    reviewImage.destroy();

    return res.json({"message": "Successfully deleted"})

})










module.exports = router
