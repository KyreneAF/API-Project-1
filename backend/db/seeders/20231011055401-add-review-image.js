'use strict';
const {ReviewImage} = require('../models');
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
let reviewImgArr =[
  {
    reviewId:1,
    url:'review url image 1',
  },
  {
    reviewId:2,
    url:'review url image 2',
  },
  {
    reviewId:3,
    url:'review url image 3',
  },
  {
    reviewId:4,
    url:'review url image 4',
  },
  {
    reviewId:5,
    url:'review url image 5',
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(reviewImgArr,{validate:true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ReviewImages',{
      url:{[Op.in]:reviewImgArr.map(img => img.url)}
    },options);
  }
};
