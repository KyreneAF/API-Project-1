'use strict';
const { User,Sequelize } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
let usersArr =[

    {
      firstName: "Tony",
      lastName: "Soprano",
      username: "tony1",
      email: "tony1@example.com",
      hashedPassword:bcrypt.hashSync('password6')
    },
    {
      firstName: "Christopher",
      lastName: "Moltisanti",
      username: "chris3",
      email: "chris3@example.com",
      hashedPassword:bcrypt.hashSync('password7')
    },
    {
      firstName: "Paulie",
      lastName: "Walnuts",
      username: "paulie4",
      email: "paulie4@example.com",
      hashedPassword:bcrypt.hashSync('password8')
    },
    {
      firstName: "Silvio",
      lastName: "Dante",
      username: "silvio5",
      email: "silvio5@example.com",
      hashedPassword:bcrypt.hashSync('password9')
    },
    {
      firstName: "Junior",
      lastName: "Soprano",
      username: "junior16",
      email: "junior16@example.com",
      hashedPassword:bcrypt.hashSync('password10')
    }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(usersArr,{validate:true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.bulkDelete(options,{
      username:{[Op.in]:usersArr.map(user => user.username)}
    },{})
  }
};
