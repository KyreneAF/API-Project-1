const express = require('express');
const {Review,ReviewImage,Spot,User} = require('../../db/models');
const { check } = require('express-validator');
const {handleSignupValidation, handleCreateErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router =express.Router();


const validateReview =[
    check('review').notEmpty().withMessage('Review text is required'),
    check('stars').notEmpty().isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer from 1 to 5'),
]



/* Get all Reviews of the Current User    */



router.get('/current', requireAuth, async(req,res,next) =>{
    let userId = req.user.id;
    let review = await Review.findAll({
        where:{
            userId,
        },
        include:[{
            model:ReviewImage,
            attributes:{exclude:['reviewId','createdAt','updatedAt']}

        },
        {
            model: Spot,
            attributes:{exclude:['createdAt','updatedAt','description']}
        },{
            model:User,
            attributes:['id','firstName','lastName']
        }]
    });

    let updatedReviews = review.map(review => {
        const updatedReview = review.toJSON();

        if(updatedReview.ReviewImages){
            updatedReview.ReviewImages.forEach(reviews =>{
                if(!reviews.preview || !reviews.url){
                    updatedReview.Spot.previewImage = 'No preview Image'
                }
                updatedReview.Spot.previewImage = reviews.url
            });

        }


        return updatedReview;
    });

    return res.json({Reviews:updatedReviews})

})






















/* Add an Image to a Review based on the Review's id   */
router.post('/:reviewId/images',requireAuth,async(req,res,next) =>{
    let reviewId = req.params.reviewId;
    let userId = req.user.id;
    let review = await Review.findByPk(reviewId,{
        include:[{
            model:ReviewImage
        }]
    });

    if(!review){
        let err = new Error();
        err.status = 404;
        err.message = "Review couldn't be found";
        return next(err);
    }

    if(userId !== review.userId){
        let err = new Error();
        err.status = 403;
        err.message = "Forbidden";
        return next(err)
    }

    reviewPojo = review.toJSON();

    if(reviewPojo.ReviewImages && reviewPojo.ReviewImages.length >= 10){
        let err = new Error();
        err.status = 403;
        err.message = "Maximum number of images for this resource was reached";
        return next(err)
    }
   let createdImg = await ReviewImage.create({
        reviewId,
        ...req.body
    })

    return res.json({
        id:createdImg.id,
        url:createdImg.url
    })
})





/*  Edit a Review  */

router.put('/:reviewId',requireAuth, validateReview,handleCreateErrors, async(req,res,next) =>{
    let userId = req.user.id;
    console.log(userId)
    let reviewId = req.params.reviewId;

    let oldReview = await Review.findByPk(reviewId)

    if(!oldReview){
        let err = new Error();
        err.status = 404;
        err.message = "Review couldn't be found";
        return next(err);
    }
    if(oldReview.userId !== userId){
        let err = new Error();
        err.status = 403;
        err.message = "Forbidden";
        return next(err)
    }


    let updatedReview = await Review.update({
        userId:oldReview.userId,
        spotId:oldReview.spotId,
        review:req.body.review,
        stars:req.body.stars,

    },{
        where:{
           id:reviewId,
        }
    })
    let newReview = await Review.findByPk(userId);

    return res.json(newReview)

})




/* DELETE REVIEW  */

router.delete('/:reviewId', requireAuth, async(req,res,next) =>{
    const userId = req.user.id;
    const reviewId = req.params.reviewId;

    let review = await Review.findByPk(reviewId);

    if(!review){
        let err = new Error();
        err.status = 404;
        err.message = "Review couldn't be found";
        return next(err)
    };

    if(review.userId !== userId){
        let err = new Error();
        err.status = 403;
        err.message = "Forbidden";
        return next(err);
    }

    await review.destroy();

    return res.json({"message": "Successfully deleted"})

})









module.exports = router;
