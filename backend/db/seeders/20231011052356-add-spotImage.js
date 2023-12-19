'use strict';
const {SpotImage} = require('../models');

let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
let spotImgArr =[
  // {
  //   spotId:1,
  //   url:'https://a0.muscache.com/im/pictures/7b2dbe13-998c-4311-a7b9-72127ba16c4f.jpg?im_w=960',
  //   preview:true,
  // },
  // {
  //   spotId:1,
  //   url:'https://a0.muscache.com/im/pictures/b14ddc75-77c0-4f62-9fa6-71c579e1a4b4.jpg?im_w=480',
  //   preview:false,
  // },
  // {
  //   spotId:1,
  //   url:'https://a0.muscache.com/im/pictures/530b3711-ce47-4f24-9cbe-b1e7b60cf3ce.jpg?im_w=480',
  //   preview:false,
  // },
  // {
  //   spotId:1,
  //   url:'https://a0.muscache.com/im/pictures/320e6363-ef22-4d71-b61a-e84d85e32eaf.jpg?im_w=480',
  //   preview:false,
  // },
  // {
  //   spotId:1,
  //   url:'https://a0.muscache.com/im/pictures/89310e87-a671-4901-9d52-303227939f50.jpg?im_w=480',
  //   preview:false,
  // },
  {
    spotId:1,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-18506757/original/9542bfa8-844e-481f-9c5e-252b8f15110f.jpeg?im_w=960',
    preview:true,
  },
  {
    spotId:1,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-18506757/original/ed199105-5355-4690-a145-00d918b34b0b.jpeg?im_w=480',
    preview:false,
  },
  {
    spotId:1,
    url:'https://a0.muscache.com/im/pictures/10152f12-608f-4bb7-a526-11ad7ae61c88.jpg?im_w=480',
    preview:false,
  },
  {
    spotId:1,
    url:'https://a0.muscache.com/im/pictures/1a8bbb95-ff25-481c-ad91-475d1296840d.jpg?im_w=480',
    preview:false,
  },
  {
    spotId:1,
    url:'https://a0.muscache.com/im/pictures/beb95362-3f5a-48ae-b205-b895e2a19c48.jpg?im_w=480',
    preview:false,
  },





  {
    spotId:5,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49427843/original/54b456b3-ddc7-4a52-9673-d1b8d75fc054.jpeg?im_w=960',
    preview:true,
  },
  {
    spotId:5,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49427843/original/11bb492a-2abe-4fd9-adba-484be128e088.jpeg?im_w=480',
    preview:false,
  },
  {
    spotId:5,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49427843/original/d003387a-1a6b-464c-8616-36c23afa8019.jpeg?im_w=480',
    preview:false,
  },
  {
    spotId:5,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49427843/original/d003387a-1a6b-464c-8616-36c23afa8019.jpeg?im_w=480',
    preview:false,
  },
  {
    spotId:5,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49427843/original/abaf52d1-d72e-42d0-912b-87ce44f18dc5.jpeg?im_w=480',
    preview:false,
  },





  {
    spotId:2,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54263489/original/0a8bc5a3-a5b0-45b0-a2fc-5234600e4f33.jpeg?im_w=960',
    preview:true,
  },
  {
    spotId:2,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54263489/original/7cc2c288-f5a6-4abc-ab20-84ea7fb5b662.jpeg?im_w=480',
    preview:false,
  },
  {
    spotId:2,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54263489/original/d81eb9c8-8004-4ad4-80bb-17a215aea760.jpeg?im_w=480',
    preview:false,
  },
  {
    spotId:2,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54263489/original/528ec5d8-1e7c-44ca-afd3-3193e419ddad.jpeg?im_w=480',
    preview:false,
  },
  {
    spotId:2,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54263489/original/0d9c1129-ebbc-46c1-9121-e7c6efd72e8e.jpeg?im_w=480',
    preview:false,
  },









  {
    spotId:3,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-653449394656100889/original/c90fa043-fee3-4150-b088-bfde7119fcdf.jpeg?im_w=960',
    preview:true
  },
  {
    spotId:3,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-653449394656100889/original/27b08358-3c42-437d-be02-afeeddbe5dde.jpeg?im_w=480',
    preview:false
  },
  {
    spotId:3,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-653449394656100889/original/a5cdfa94-34cb-4685-a60c-8965dd8979ca.jpeg?im_w=480',
    preview:false
  },
  {
    spotId:3,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-653449394656100889/original/86a84f68-b2cf-4d06-980c-131361226eff.jpeg?im_w=480',
    preview:false
  },
  {
    spotId:3,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-653449394656100889/original/d3e94205-6741-4674-932f-80e439cce080.jpeg?im_w=480',
    preview:false
  },






  {
    spotId:4,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-34749782/original/7f63db8e-14af-4873-976e-79537cfed499.jpeg?im_w=960',
    preview:true,
  },
  {
    spotId:4,
    url:'https://a0.muscache.com/im/pictures/d7423a29-36d9-447b-bf3d-90f2a88d5105.jpg?im_w=480',
    preview:false,
  },
  {
    spotId:4,
    url:'https://a0.muscache.com/im/pictures/61cc17cf-bac0-437a-b0c2-983ce7aa7064.jpg?im_w=480',
    preview:false,
  },
  {
    spotId:4,
    url:'https://a0.muscache.com/im/pictures/b42429a6-61cf-4edc-8749-80991700c7ac.jpg?im_w=480',
    preview:false,
  },
  {
    spotId:4,
    url:'https://a0.muscache.com/im/pictures/1c28221a-04fe-4f0d-a1e6-495274d11218.jpg?im_w=480',
    preview:false,
  },



  {
    spotId:6,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-25113399/original/97ac1bdb-3117-4644-9671-09757d6b0751.jpeg?im_w=960',
    preview:true,
  },
  {
    spotId:6,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-25113399/original/ad0af5f4-b837-4bd4-b0c6-0237332ea7a2.jpeg?im_w=480',
    preview:false,
  },
  {
    spotId:6,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-25113399/original/4fadf82d-a36a-4f13-846c-dde8ea5d2d93.jpeg?im_w=480',
    preview:false,
  },
  {
    spotId:6,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-25113399/original/bf0a8b43-592b-4926-b5dc-714084ecfd39.jpeg?im_w=480',
    preview:false,
  },
  {
    spotId:6,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-25113399/original/ee16fd0c-1890-4077-b3e1-a6e28b597647.jpeg?im_w=480',
    preview:false,
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImgArr,{validate:true})

  },

  async down (queryInterface, Sequelize) {
    options.tableName ='SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      url:{[Op.in]: spotImgArr.map(img => img.url)}
    },{});
  }
};
