'use strict';
const {User, Sequelize} = require('../models')
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
  {
    firstName:'Demo-lition',
    lastName:'Demo-Last',
    username:'Demo-User',
    email:'demo@user.io',
    hashedPassword:bcrypt.hashSync('password6'),

  },
  {
    firstName:'Tony',
    lastName:'Soprano',
    username:'DiMeoFam',
    email:'TonySop@user.io',
    hashedPassword:bcrypt.hashSync('varsityathlete'),

  },
  {
    firstName:'Jim',
    lastName:'Lahey',
    username:'jimbo1',
    email:'jimbo@user.io',
    hashedPassword:bcrypt.hashSync('password7'),

  },


]
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(usersArr,{validate:true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      username:{[Op.in]:usersArr.map(user => user.username)}
    },{})
  }
};
