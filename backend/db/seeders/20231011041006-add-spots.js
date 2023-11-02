'use strict';

const {Spot,Sequelize} = require('../models');

let options ={};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
let spotArr =[
  {
    ownerId: 1,
    address: '123 coconut ln',
    city:'Dallas',
    state:'TX',
    country:'America',
    lat: 45.2341,
    lng:67.8531,
    name:'Boogie Lounge',
    description:'A Place to Dance the Night Away',
    price:200.00

  },
  {
    ownerId: 1,
    address: '321 Mango ln',
    city:'Denver',
    state:'CO',
    country:'Spain',
    lat: 49.2341,
    lng:27.8531,
    name:'Black Box',
    description:'Concert Venue',
    price:100.20

  },
  {
    ownerId: 2,
    address: '821 Sunshine ln',
    city:'Las Cruces',
    state:'NM',
    country:'America',
    lat: 80.2341,
    lng: 15.8531,
    name:'Cabin Inn',
    description:'A beautiful spot to view the mountains',
    price:250.00

  },
  {
    ownerId: 3,
    address: '555 Sabbath st',
    city:'Birmingham',
    state:'CA',
    country:'England',
    lat: 20.2341,
    lng: 60.8531,
    name:'Romantic Cottage',
    description:'A Sweet british countryside cottage',
    price:250.00

  },
  {
    ownerId: 2,
    address: '867 Jenny ln',
    city:'Carrollton',
    state:'TX',
    country:'USA',
    lat: 30.2341,
    lng: 30.8531,
    name:'Sky Lounge',
    description:'A beautiful seaside front',
    price:100.00

  },
  {
    ownerId: 4,
    address: '765 Yesterday st',
    city:'Seattle',
    state:'WA',
    country:'USA',
    lat: 36.2341,
    lng: 70.8531,
    name:'Space Needle',
    description:'A wonderful aerial view of the city',
    price:60.00

  },
]
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(spotArr,{validate:true})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op; // Ensure Op is accessed through Sequelize
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: spotArr.map(spot1 => spot1.name) }
    }, {});
  }
};
