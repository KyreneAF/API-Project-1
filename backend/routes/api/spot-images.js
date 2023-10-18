const express = require('express');
const {requireAuth} = require('../../utils/auth');
const {Spot,SpotImage} = require('../../db/models');
const { check } = require('express-validator');
const {handleSignupValidation, handleCreateErrors} = require('../../utils/validation');
const router = express.Router()

router.delete('/:imageId', requireAuth,async (req,res,next) =>{
    let imageId = req.params.imageId;
    let userId = req.user.id;

    const spotImage = await SpotImage.findByPk(imageId,{
        include:{
            model:Spot,
            attributes:['ownerId']
        }
    });

    if(!spotImage){
        let err = new Error();
        err.status = 404;
        err.message = "Spot Image couldn't be found"
        return next(err)
    }

    if(spotImage.Spot.ownerId !== userId){
        let err = new Error();
        err.status = 403;
        err.message = "Forbidden"
        return next(err)
    }

    await spotImage.destroy();

    return res.json({"message": "Successfully deleted"})

})










module.exports = router
