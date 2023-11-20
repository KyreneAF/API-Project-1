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
    country:'America',
    lat: 45.2341,
    lng:67.8531,
    name:'Boogie Lounge',
    description:'Welcome to the Boogie Lounge! This vibrant and lively spot is the perfect destination for those who love to dance the night away. Located in the heart of Dallas, Texas, this Airbnb offers a unique experience with its energetic atmosphere. Whether you are a dance enthusiast or just looking for a fun getaway, the Boogie Lounge promises an unforgettable stay. Priced at $200.00 per night, immerse yourself in the rhythm of the night!',
    price:200.00

  },
  {
    ownerId: 1,
    address: '321 Mango ln',
    city:'Denver',
    state:'Colorado',
    country:'Spain',
    lat: 49.2341,
    lng:27.8531,
    name:'Black Box',
    description:'Step into the mysterious and enchanting world of the Black Box. Nestled in the vibrant city of Denver, Colorado, this goth-inspired home is a haven for those seeking a unique and unforgettable stay. Immerse yourself in the dark aesthetics and artistic ambiance of the Black Box, priced at $95.00 per night. Perfect for creative souls and those looking for an alternative getaway.',
    price:95.00

  },
  {
    ownerId: 2,
    address: '821 Sunshine ln',
    city:'Las Cruces',
    state:'New Mexico',
    country:'America',
    lat: 35.2359,
    lng: 37.2359,
    name:'Cabin Inn',
    description:'Escape to the serenity of the mountains with a stay at the Cabin Inn. Located in the picturesque Las Cruces, New Mexico, this Airbnb offers a breathtaking view of the surrounding peaks. Whether you are a nature lover or simply seeking tranquility, the Cabin Inn is the perfect retreat. Priced at $95.00 per night, experience the beauty of nature right at your doorstep.',
    price:95.00

  },
  {
    ownerId: 3,
    address: '555 Sabbath st',
    city:'Birmingham',
    state:'California',
    country:'England',
    lat: 20.2341,
    lng: 60.8531,
    name:'Romantic Cottage',
    description:'Step into the charm of a British countryside with the Romantic Cottage in Birmingham, California. This sweet and cozy retreat offers a delightful escape for couples seeking a romantic getaway. Priced at $250.00 per night, indulge in the warmth and intimacy of this lovely cottage. Perfect for those looking to create lasting memories in a picturesque setting.',
    price:250.00

  },
  {
    ownerId: 2,
    address: '867 Jenny ln',
    city:'Carrollton',
    state:'Texas',
    country:'USA',
    lat: 32.2341,
    lng: 38.8531,
    name:'Sky Lounge',
    description:'Elevate your stay at the Sky Lounge, a beautiful seaside front Airbnb in Carrollton, Texas. Enjoy the soothing sounds of the waves and breathtaking ocean views. Priced at $100.00 per night, this coastal retreat provides a perfect blend of relaxation and luxury. Ideal for those seeking a peaceful escape by the sea.',
    price:100.00

  },
  {
    ownerId: 4,
    address: '765 Yesterday st',
    city:'Seattle',
    state:'Washington',
    country:'USA',
    lat: 36.2341,
    lng: 70.8531,
    name:'A beautiful condo overlooking the city.',
    description:'Experience the magic of Seattle from the heights of this beautiful condo. Perched high above the city on Yesterday Street, this Airbnb offers a wonderful aerial view of the city skyline. Priced at $60.00 per night, indulge in the luxury of a cozy retreat with a captivating panorama. Perfect for those who appreciate the beauty of city lights and urban landscapes.',
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
