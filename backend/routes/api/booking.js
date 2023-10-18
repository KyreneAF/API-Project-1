const express = require('express');
const {Spot,Review,SpotImage,User,Booking} = require('../../db/models');
const { check } = require('express-validator');
const {handleSignupValidation, handleCreateErrors} = require('../../utils/validation');
const {requireAuth} = require('../../utils/auth');
const router =express.Router();



// router.get('/spots/:spotId/bookings',requireAuth, async(req,res) =>{
// let spotId = req.params.spotId;
// let userId = req.user.id

// let allBookings = await Booking.findAll({
//     where:{
//         spotId
//     },
//     attributes:['spotId','startDate','endDate'],
//     include:[{
//         model:User,
//         attributes:['id','firstName','lastName']
//     }]
// });
// // for(let objs of allBookings){
// //     if(objs.userId)
// // }

// res.json(allBookings)
// })








module.exports = router;
