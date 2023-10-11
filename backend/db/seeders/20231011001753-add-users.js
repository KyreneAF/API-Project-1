'use strict';
const {User, sequelize} = require('../models')
const bcrypt =require('bcryptjs');

let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
let usersArr =[
  {
    firstName:'Brandon',
    lastName:'Flores',
    username:'BrandonFlores1',
    email:'brandon@gmail.com',
    hashedPassword:bcrypt.hashSync('password1'),

  },
  {
    firstName:'Sasha',
    lastName:'Flores',
    username:'SashaFlores1',
    email:'sasha@gmail.com',
    hashedPassword:bcrypt.hashSync('password2'),

  },
  {
    firstName:'Jet',
    lastName:'Flores',
    username:'JetFlores1',
    email:'jet@gmail.com',
    hashedPassword:bcrypt.hashSync('password3'),

  },
  {
    firstName:'Holly',
    lastName:'Flores',
    username:'HollyFlores1',
    email:'holly@gmail.com',
    hashedPassword:bcrypt.hashSync('password4'),

  },
  {
    firstName:'Caska',
    lastName:'Flores',
    username:'CaskaFlores1',
    email:'caska@gmail.com',
    hashedPassword:bcrypt.hashSync('password5'),

  },

]
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(usersArr,{validate:true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = sequelize.Op;
    return queryInterface.bulkDelete(options,{
      userName:{[Op.in]:usersArr.map(user => user.userName)}
    },{})
  }
};
