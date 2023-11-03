'use strict';
const {SpotImage} = require('../models');

let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
// /** @type {import('sequelize-cli').Migration} */
let spotImgArr =[
  {
    spotId:7,
    url:'image url 6',
    preview:true,
  },
  {
    spotId:8,
    url:'image url 7',
    preview:true,
  },
  {
    spotId:9,
    url:'image url 8',
    preview:false,
  },
  {
    spotId:10,
    url:'image url 9',
    preview:true
  },
  {
    spotId:11,
    url:'image url 10',
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
    return queryInterface.bulkDelete(options,{
      url:{[Op.in]: spotImgArr.map(img => img.url)}
    },{});

  }
};
