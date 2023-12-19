'use strict';
const {Review} = require('../models');
let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

let reviewArr =[
  {
    spotId:1,
    userId:3,
    review:'Best spot ever',
    stars:5.0
  },
  {
    spotId:2,
    userId:1,
    review:'Horrible spot',
    stars:1.0
  },
  {
    spotId:3,
    userId:1,
    review:'Nice',
    stars:3.0
  },
  {
    spotId:1,
    userId:1,
    review:'Loved the view',
    stars:3.0
  },
  {
    spotId:1,
    userId:1,
    review:'Loved the view',
    stars:3.0
  },
  {
    spotId:1,
    userId:1,
    review:'Loved the view',
    stars:3.0
  },
  {
    spotId:4,
    userId:3,
    review:'Nice spot',
    stars:4.0
  },
  {
    spotId: 1,
    userId: 2,
    review: "Had a great time at Spot 1! The amenities were excellent, and the view was stunning. The only downside was the distance to nearby attractions.",
    stars: 4.0
  },
  {
    "spotId": 1,
    "userId": 4,
    "review": "Spot 1 is a hidden gem! The cozy atmosphere, friendly staff, and convenient location made our stay unforgettable. We'll definitely be back!",
    "stars": 5.0
  },
  {
    "spotId": 1,
    "userId": 5,
    "review": "Spot 1 is a hidden gem! The cozy atmosphere, friendly staff, and convenient location made our stay unforgettable. We'll definitely be back!",
    "stars": 5.0
  },
  {
    "spotId": 2,
    "userId": 3,
    "review": "Nice spot, but the cleanliness could have been better. The staff was responsive, and the facilities were decent, though.",
    "stars": 3.0
  },
  {
    "spotId": 2,
    "userId": 4,
    "review": "Spot 2 is a true paradise! The breathtaking views, friendly staff, and modern amenities create an unparalleled vacation experience. A definite favorite!",
    "stars": 5.0
  },
  {
    "spotId": 2,
    "userId": 5,
    "review": "Decent spot, but the noise level from neighboring areas was a bit distracting. On the positive side, the staff was accommodating and the property well-kept.",
    "stars": 3.0
  }






]
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(reviewArr,{validate:true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName ='Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      review:{[Op.in]:reviewArr.map(rev => rev.review)}
    },{});
  }
};
