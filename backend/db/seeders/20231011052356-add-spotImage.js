'use strict';
const {SpotImage} = require('../models');

let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
let spotImgArr =[
  {
    spotId:1,
    url:'image url 1',
    preview:true,
  },
  {
    spotId:1,
    url:'image url 2',
    preview:true,
  },
  {
    spotId:2,
    url:'image url 2',
    preview:false,
  },
  {
    spotId:3,
    url:'image url 3',
    preview:true
  },
  {
    spotId:4,
    url:'image url 3',
    preview:false,
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImgArr,{validate:true})

  },

  async down (queryInterface, Sequelize) {
    options.tableName ='SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages',{
      url:{[Op.in]: spotImgArr.map(img => img.url)}
    },options);
  }
};
