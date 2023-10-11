'use strict';
const {Booking} = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
let bookingArr =[
  {
    spotId:1,
    userId:4,
    startDate:new Date ('2021-02-10'),
    endDate:new Date ('2021-02-14')
  },
  {
    spotId:2,
    userId:1,
    startDate: new Date ('2023-10-30'),
    endDate:new Date ('2023-10-31')
  },
  {
    spotId:3,
    userId:2,
    startDate: new Date ('2023-10-31'),
    endDate:new Date ('2023-11-05')
  },
  {
    spotId:4,
    userId:1,
    startDate: new Date ('2023-11-11'),
    endDate:new Date ('2023-11-12')
  },
  {
    spotId:2,
    userId:5,
    startDate: new Date ('2023-12-20'),
    endDate:new Date ('2023-12-26')
  },

]
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate(bookingArr,{validate:true })

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings',{
      spotId:{[Op.in]:bookingArr.map(book => book.spotId)}
    },options)
  }
};
