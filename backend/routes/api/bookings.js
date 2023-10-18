const express = require('express');
const {requireAuth} = require('../../utils/auth');
const {Spot,SpotImage,Review,User,Booking} = require('../../db/models');
const { check } = require('express-validator');
const {handleSignupValidation, handleCreateErrors} = require('../../utils/validation');
const router = express.Router();


/* GET ALL BOOKINGS OF CURRENT USER   */

// router.get('/current', requireAuth, async(req,res) =>{
//     const userId = req.user.id
//     let bookings = await Booking.findAll({
//         where:{
//             userId,
//         },
//         include:[{
//             model:Spot,
//             attributes:{
//                 exclude: ['createdAt', 'updatedAt','description']
//             },
//         }]
//     })
//     console.log(bookings,'!!!!!!!!')
//    return res.json({Bookings:bookings})
// })


router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    console.log(userId,'!!!!!!!')

        let bookings = await Booking.findAll({
            where: {
                userId,
            },
            include: [{
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                },
            }]
        });
       for (let objs of bookings){
            let previewImage = await SpotImage.findOne({
                where:{
                    spotId: objs.spotId,
                    preview:true,
                },
                attributes:['url']
            })

            if(previewImage) objs.Spot.dataValues.previewImage = previewImage
        }

        res.json({ Bookings: bookings });

});




module.exports = router;
