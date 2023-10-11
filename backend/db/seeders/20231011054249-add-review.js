'use strict';
const {Review} = require('../models');
let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.Schema;
}

let reviewArr =[
  {
    spotId:1,
    userId:3,
    review:'Best spot ever',
    stars:5
  },
  {
    spotId:2,
    userId:1,
    review:'Horrible spot',
    stars:1
  },
  {
    spotId:3,
    userId:1,
    review:'Nice',
    stars:3
  },
  {
    spotId:1,
    userId:1,
    review:'Loved the view',
    stars:3
  },
  {
    spotId:4,
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
    return queryInterface.bulkDelete('Reviews',{
      review:{[Op.in]:reviewArr.map(rev => rev.review)}
    },options);
  }
};
