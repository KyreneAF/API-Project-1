const express = require('express');
const {requireAuth} = require('../../utils/auth');
const {Spot,SpotImage,Review,User,Booking} = require('../../db/models');
const { check } = require('express-validator');
const {handleSignupValidation, handleCreateErrors} = require('../../utils/validation');
const router = express.Router();


validateBooking = [
    check("endDate")
      .custom((val, { req }) => {
        const endDate = new Date(val);
        const startDate = new Date(req.body.startDate);
        return endDate.getTime() > startDate.getTime();
      })
      .withMessage("endDate cannot come before startDate")
      .custom((val, { req }) => {
        const endDate = new Date(val);
        const startDate = new Date(req.body.startDate);
        return endDate.getTime() !== startDate.getTime();
      })
      .withMessage("startDate cannot be the same as endDate"),
  ];





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




/* PUT EDIT BOOKING   */

router.put('/:bookingId', requireAuth, validateBooking,handleCreateErrors, async(req,res,next) =>{
    const bookingId = req.params.bookingId
    const userId = req.user.id;

    const booking = await Booking.findByPk(bookingId);

    if(!booking){
        let err = new Error();
        err.status = 404;
        err.message = "Booking couldn't be found";
        return next(err)
    }

    if(booking.userId !== userId){
        let err = new Error()
        err.status = 403;
        err.message = 'Forbidden'
        return next(err)
    };

    if(booking.endDate < Date.now()){
        let err = new Error()
        err.status = 403;
        err.message = "Past bookings can't be modified"
        return next(err)
    }

    booking.update({
        startDate :req.body.startDate,
        endDate:req.body.endDate,
    });

    const updatedBooking = await Booking.findByPk(bookingId);

    return res.json(updatedBooking)

})


















module.exports = router;
