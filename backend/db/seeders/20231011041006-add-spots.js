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
    state:'Texas',
    country:'United States',
    lat: 45.2341,
    lng:67.8531,
    name:'Boogie Lounge',
    description: 'Dance the night away in vibrant Dallas! Boogie Lounge, priced at $200/night, promises an unforgettable stay.',
    price:200.00

  },
  {
    ownerId: 1,
    address: '321 Mango ln',
    city:'Denver',
    state:'Colorado',
    country:'United States',
    lat: 49.2341,
    lng:27.8531,
    name:'Black Box',
    description:'Step into the mysterious Black Box in Denver, Colorado—a goth-inspired haven for a unique and unforgettable stay. Immerse yourself in dark aesthetics.',
    price:95.00

  },
  {
    ownerId: 2,
    address: '821 Sunshine ln',
    city:'Tampa',
    state:'Florida',
    country:'United States',
    lat: 35.2359,
    lng: 37.2359,
    name:'Cabin Inn',
    description:'Escape to the serenity of the mountains with a stay at Cabin Inn in Las Cruces, New Mexico. Experience nature and beauty.',
    price:95.00

  },
  {
    ownerId: 3,
    address: '555 Sabbath st',
    city:'Birmingham',
    state:'California',
    country:'United Kingdom',
    lat: 20.2341,
    lng: 60.8531,
    name:'Romantic Cottage',
    description:'Indulge in the warmth of a Romantic Cottage in Birmingham, California. Perfect for couples seeking a charming getaway.',
    price:250.00

  },
  {
    ownerId: 2,
    address: '867 Jenny ln',
    city:'Carrollton',
    state:'Texas',
    country:'United States',
    lat: 32.2341,
    lng: 38.8531,
    name:'Sky Lounge',
    description:'Elevate your stay at Sky Lounge, a seaside Airbnb in Carrollton, Texas. Enjoy ocean views.',
    price:100.00

  },
  {
    ownerId: 4,
    address: '765 Yesterday st',
    city:'Seattle',
    state:'Washington',
    country:'United States',
    lat: 36.2341,
    lng: 70.8531,
    name:'A beautiful condo overlooking the city.',
    description:'Experience some Seattle magic from a beautiful condo on Yesterday Street.',
    price:60.00

  },
  {
    ownerId: 7,
    address: '123 Palm Tree Lane',
    city: 'Miami',
    state: 'Florida',
    country: 'United States',
    lat: 25.7617,
    lng: -80.1918,
    name: 'Tropical Paradise 1',
    description: 'A beautiful spot with palm trees and sandy beaches.',
    price: 150,
  },
  {
    ownerId: 7,
    address: '456 Ocean View Street',
    city: 'Honolulu',
    state: 'Hawaii',
    country: 'United States',
    lat: 21.3069,
    lng: -157.8583,
    name: 'Tropical Getaway 2',
    description: 'Relax and unwind in this tropical oasis.',
    price: 571,
  },
  {
    ownerId: 7,
    address: '789 Urban Avenue',
    city: 'New York City',
    state: 'New York',
    country: 'United States',
    lat: 40.7128,
    lng: -74.0060,
    name: 'City Center Loft',
    description: 'Experience the vibrant life of the city.',
    price: 250,
  },
  {
    ownerId: 7,
    address: '101 Skyscraper Street',
    city: 'Chicago',
    state: 'Illinois',
    country: 'United States',
    lat: 41.8781,
    lng: -87.6298,
    name: 'City View Penthouse',
    description: 'Enjoy breathtaking city views from the top floor.',
    price: 300,
  },
  {
    ownerId: 8,
    address: '321 Beachfront Avenue',
    city: 'Bora',
    state: 'Leeward',
    country: 'Polynesia',
    lat: -16.5000,
    lng: -151.7500,
    name: 'Tropical Retreat 1',
    description: 'Experience luxury in the heart of Bora.',
    price: 300,
  },
  {
    ownerId: 8,
    address: '987 Island Cove',
    city: 'Maui',
    state: 'Hawaii',
    country: 'United States',
    lat: 20.7984,
    lng: -156.3319,
    name: 'Maui Paradise Villa',
    description: 'Unwind in this luxurious villa with stunning ocean views.',
    price: 400,
  },
  {
    ownerId: 8,
    address: '555 Downtown Blvd',
    city: 'New Orleans',
    state: 'Louisiana',
    country: 'United States',
    lat: 29.9511,
    lng: -90.0715,
    name: 'French Quarter Loft',
    description: 'Immerse yourself in the culture of New Orleans. Visit voodoo street!',
    price: 280,
  },
  {
    ownerId: 8,
    address: '123 Urban Street',
    city: 'Tokyo',
    state: 'Tokyo',
    country: 'Japan',
    lat: 35.6895,
    lng: 139.6917,
    name: 'Tokyo City View',
    description: 'Enjoy the bustling city life of Tokyo.',
    price: 380,
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
