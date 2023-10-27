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




/*  get all bookings of current user    */


router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;


        const bookings = await Booking.findAll({
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

        for (let booking of bookings) {

            const img = await SpotImage.findOne({
                where: {
                    spotId: booking.Spot.id,
                },
                attributes: ['url']
            });

            if (img) {

                booking.Spot.dataValues.previewImage = img.url;
            } else {

                booking.Spot.dataValues.previewImage = 'No preview image';
            }
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


/* DELETE BOOKING     */

router.delete('/:bookingId', requireAuth, async(req,res,next) =>{
    const bookingId = req.params.bookingId;
    const userId = req.user.id;

    const booking = await Booking.findByPk(bookingId,{
        include:{
            model:Spot,
            attributes:['ownerId']
        }
    });

    if(!booking){
        let err = new Error();
        err.status = 404;
        err.message = "Booking couldn't be found";
        return next(err)
    };
    if(booking.startDate <= Date.now()){
        let err = new Error();
        err.status = 403;
        err.message = "Bookings that have been started can't be deleted";
        return next(err)
    };

    console.log(booking.userId,'!!!!!!',booking.Spot.ownerId,'&&&&&&&&')

    if(booking.userId !== userId && booking.Spot.ownerId !== userId){
        let err = new Error();
        err.status = 404;
        err.message = "Forbidden";
        return next(err)
    };

    await booking.destroy()

    return res.json({"message": "Successfully deleted"})

})













module.exports = router;
