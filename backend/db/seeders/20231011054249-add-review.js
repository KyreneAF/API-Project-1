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
    spotId:14,
    userId:1,
    review:'Very nice place! Quiet, cozy, and close to transportation.',
    stars:4.0,
  },
  {
    spotId:14,
    userId:2,
    review:'I dont have anything negative to say about this place. It is clean, quiet, close to everything especially train stations. The host was very friendly and helpful.',
    stars:3.0,
  },
  {
    spotId:14,
    userId:3,
    review:'We would have stayed much longer.',
    stars:5.0,
  },
  {
    spotId:14,
    userId:4,
    review:'Host was kind enough to get us cos we got lost. Nice location because near train station',
    stars:5.0,
  },
  {
    spotId:14,
    userId:8,
    review:'Amazing location and highly recommended stay in Shinjuku! Thank you Andy for providing a brilliant place.',
    stars:4.0,
  },
  {
    spotId:8,
    userId:7,
    review:'Incredible views, must visit',
    stars:4.0,
  },
  {
    spotId:8,
    userId:3,
    review:'Lovely atmosphere, will return.',
    stars:5.0,
  },
  {
    spotId:8,
    userId:5,
    review:'Fantastic location, recommend',
    stars:2.0,
  },
  {
    spotId:13,
    userId:3,
    review:'Not the cleanest spot.',
    stars:1.0,
  },  {
    spotId:13,
    userId:4,
    review:'Local music was fantastic',
    stars:4.0,
  },  {
    spotId:13,
    userId:5,
    review:'This place had an awesome vintage feel',
    stars:3.0,
  },  {
    spotId:13,
    userId:6,
    review:'A tad dirty but the host was very kind',
    stars:3.0,
  },  {
    spotId:13,
    userId:7,
    review:'Nice enough. There was a hurricane warning during my stay',
    stars:2.0,
  },










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
