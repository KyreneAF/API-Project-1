'use strict';
const {Review} = require('../models');
let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
// /** @type {import('sequelize-cli').Migration} */
let reviewArr =[
  {
    spotId:7,
    userId:3,
    review:'There was a suspicious red stain...',
    stars:1
  },
  {
    spotId:8,
    userId:1,
    review:'The clams gave me food poisoning',
    stars:1
  },
  {
    spotId:9,
    userId:8,
    review:'Just one hop away from an amazing Gabagool spot',
    stars:5
  },
  {
    spotId:10,
    userId:9,
    review:'Great spot for a bachelor party',
    stars:4
  },
  {
    spotId:11,
    userId:3,
    review:'Nice spot',
    stars:4
  },
]
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(reviewArr,{validate:true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName ='Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      review:{[Op.in]:reviewArr.map(rev => rev.review)}
    },{});
  }
};
