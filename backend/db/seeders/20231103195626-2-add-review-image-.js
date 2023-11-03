'use strict';

const {ReviewImage} = require('../models');
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
// /** @type {import('sequelize-cli').Migration} */
let reviewImgArr =[
  {
    reviewId:1,
    url:'review url image 6',
  },
  {
    reviewId:2,
    url:'review url image 7',
  },
  {
    reviewId:3,
    url:'review url image 8',
  },
  {
    reviewId:4,
    url:'review url image 9',
  },
  {
    reviewId:5,
    url:'review url image 10',
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
