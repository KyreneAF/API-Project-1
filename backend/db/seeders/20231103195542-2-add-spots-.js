'use strict';
const {Spot, Sequelize} = require('../models')


let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

let spotsArr =[
  {
    ownerId: 6,
    address: "567 Northway Dr",
    city: "North Caldwell",
    state: "NJ",
    country: "USA",
    lat: 40.8483,
    lng: -74.2462,
    name: "Satriale's Pork Store",
    description: "Cozy room above the famous pork store",
    price: 50.00
  },
  {
    ownerId: 7,
    address: "340 Bloomfield Ave",
    city: "Caldwell",
    state: "NJ",
    country: "USA",
    lat: 40.8407,
    lng: -74.2767,
    name: "Nuovo Vesuvio",
    description: "Authentic Italian experience in a private suite",
    price: 75.00
  },
  {
    ownerId: 6,
    address: "15 Central Park West",
    city: "New York",
    state: "NY",
    country: "USA",
    lat: 40.7717,
    lng: -73.9813,
    name: "Carmine's",
    description: "Luxury penthouse overlooking Central Park",
    price: 200.00
  },
  {
    ownerId: 8,
    address: "1015 Washington St",
    city: "Hoboken",
    state: "NJ",
    country: "USA",
    lat: 40.7506,
    lng: -74.0256,
    name: "Bada Bing Club",
    description: "Exclusive gentlemen's club and event space",
    price: 500.00
  },
  {
    ownerId: 9,
    address: "503 Main St",
    city: "North Bergen",
    state: "NJ",
    country: "USA",
    lat: 40.8042,
    lng: -74.0137,
    name: "The Bing",
    description: "Charming room near the local bar",
    price: 40.00
  },

]

module.exports = {
  async up (queryInterface, Sequelize) {
      await Spot.bulkCreate(spotsArr,{validate:true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      name:{[Op.in]: spotsArr.map(spot1 => spot1.name)}
    },{});
  }
};
