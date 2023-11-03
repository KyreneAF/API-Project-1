'use strict';
const {Booking} = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

// /** @type {import('sequelize-cli').Migration} */
let bookingArr =[
  {
    spotId:7,
    userId:8,
    startDate:new Date ('2025-02-15'),
    endDate:new Date ('2025-02-17')
  },
  {
    spotId:9,
    userId:1,
    startDate: new Date ('2025-10-30'),
    endDate:new Date ('2025-10-31')
  },
  {
    spotId:10,
    userId:7,
    startDate: new Date ('2024-12-23'),
    endDate:new Date ('2024-12-26')
  },
  {
    spotId:4,
    userId:1,
    startDate: new Date ('2025-11-11'),
    endDate:new Date ('2025-11-12')
  },
  {
    spotId:2,
    userId:5,
    startDate: new Date ('2025-01-01'),
    endDate:new Date ('2025-01-05')
  },

]




module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate(bookingArr,{validate:true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      spotId:{[Op.in]:bookingArr.map(book => book.spotId)}
    },{})
  }
};
