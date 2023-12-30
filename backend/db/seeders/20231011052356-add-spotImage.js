'use strict';
const {SpotImage} = require('../models');

let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
let spotImgArr =[

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

  {
    spotId:7,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-44418623/original/212db060-7a53-4bd0-b2ed-d0311514a84e.jpeg?im_w=960',
    preview:true,

  },
  {
    spotId:7,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-44418623/original/7a214b3b-b57c-4cbb-9141-473d02b1dde5.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:7,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-44418623/original/d8e291eb-802e-4f4f-94f5-d1e6a06ee168.png?im_w=480',
    preview:false,

  },
  {
    spotId:7,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-44418623/original/495132be-bf59-4265-87b2-cf07a830fb32.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:7,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-44418623/original/b43e9216-d85f-4df6-a015-64dc136f701e.jpeg?im_w=480',
    preview:false,

  },

  {
    spotId:8,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-890669778927550894/original/fd257ce6-23ff-415b-b19f-9d6e185cd87b.jpeg?im_w=960',
    preview:true,

  },
  {
    spotId:8,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-890669778927550894/original/27e69aae-3bef-4b7c-9552-f626e50c80b8.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:8,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-890669778927550894/original/df5ad214-4644-432b-ab9c-3ba55bcb7bce.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:8,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-890669778927550894/original/ca22799b-8bab-45dd-8faa-8ade09e4cb24.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:8,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-890669778927550894/original/96879953-1093-4279-bf7e-ea1344b1bb0a.jpeg?im_w=480',
    preview:false,

  },

  {
    spotId:9,
    url:'https://a0.muscache.com/im/pictures/2aed912d-c8c5-41d1-9da2-dc137aff68b2.jpg?im_w=960',
    preview:true,

  },
  {
    spotId:9,
    url:'https://a0.muscache.com/im/pictures/4ec7343d-45bb-4633-b6a3-ebe987efb7f8.jpg?im_w=480',
    preview:false,

  },
  {
    spotId:9,
    url:'https://a0.muscache.com/im/pictures/aea2934c-7e45-43b7-9c1a-64a3a1223e84.jpg?im_w=480',
    preview:false,

  },
  {
    spotId:9,
    url:'https://a0.muscache.com/im/pictures/891ab184-4000-4823-b471-ac772c5e7cf3.jpg?im_w=480',
    preview:false,

  },
  {
    spotId:9,
    url:'https://a0.muscache.com/im/pictures/e45695a0-30f6-464f-ab38-4bb5093d26f0.jpg?im_w=480',
    preview:false,

  },

  {
    spotId:10,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-19944137/original/3757ba1b-1191-4ab0-8c27-9fa0ccf46480.jpeg?im_w=960',
    preview:true,

  },
  {
    spotId:10,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-19944137/original/223346a3-09da-45b7-9aa6-f138178b6c7c.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:10,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-19944137/original/91fd40ef-ccde-4488-8ac4-1d48d969f71c.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:10,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-19944137/original/daf4303d-bc32-4891-9094-2206528f8654.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:10,
    url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-19944137/original/69968b1c-e811-4e99-8b8f-f17a60874396.jpeg?im_w=480',
    preview:false,

  },

  {
    spotId:11,
    url:'https://a0.muscache.com/im/pictures/36e9b51b-55c9-41dc-a35b-00c4264f2ae4.jpg?im_w=960',
    preview:true,

  },
  {
    spotId:11,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-49656770/original/260736d7-029c-4fe9-997c-b868f4e64167.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:11,
    url:'https://a0.muscache.com/im/pictures/4cd506bc-1a7a-4327-980e-6ae629fd0128.jpg?im_w=480',
    preview:false,

  },
  {
    spotId:11,
    url:'https://a0.muscache.com/im/pictures/bfaaa538-effc-4ee5-bff2-42299ea96a0e.jpg?im_w=480',
    preview:false,

  },
  {
    spotId:11,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-49656770/original/1fc30f1d-d8c3-422e-957a-e6e56aae72a5.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:12,
    url:'https://a0.muscache.com/im/pictures/8bdf14e5-df83-4139-853c-9f99d87f7324.jpg?im_w=960' ,
    preview:true,

  },
  {
    spotId:12,
    url:'https://a0.muscache.com/im/pictures/72b00382-af97-4960-a87a-d77812b0f71f.jpg?im_w=480',
    preview:false,

  },
  {
    spotId:12,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-7681649/original/48407a46-6753-4bea-897f-8fd7d3ba7462.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:12,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-7681649/original/67df10a8-176d-499a-b39b-05256247ec76.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:12,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-7681649/original/a29f4b3a-d3cc-456b-bd20-11ecb6736cef.jpeg?im_w=480',
    preview:false,

  },
  {
    spotId:13,
    url:'https://a0.muscache.com/im/pictures/549bb193-8f9a-4888-8103-c0a1707b0897.jpg?im_w=960',
    preview:true,

  },
  {
    spotId:13,
    url:'https://a0.muscache.com/im/pictures/1177f136-58c7-42e1-b1d6-9a02316a4b93.jpg?im_w=480',
    preview:false

  },
  {
    spotId:13,
    url:'https://a0.muscache.com/im/pictures/miso/Hosting-19349334/original/e0bd5ca0-02ab-4636-b904-1a44cba36062.png?im_w=480',
    preview:false

  },
  {
    spotId:13,
    url:'https://a0.muscache.com/im/pictures/b1124d24-adbd-4dd2-8605-eab67c49eeb8.jpg?im_w=480',
    preview:false

  },
  {
    spotId:13,
    url:'https://a0.muscache.com/im/pictures/54982660-5998-44eb-9684-90a619cf03f9.jpg?im_w=480',
    preview:false

  },

  {
    spotId:14,
    url:'https://a0.muscache.com/im/pictures/4e9f5bcf-f5ab-4073-91a1-32b59ccddb10.jpg?im_w=960',
    preview:true,

  },
  {
    spotId:14,
    url:'https://a0.muscache.com/im/pictures/9ebad073-4f5b-40e8-8c06-17b45da9b64d.jpg?im_w=480',
    preview:false,

  },
  {
    spotId:14,
    url:'https://a0.muscache.com/im/pictures/01cd458e-e298-426c-8d3f-c2f425ef6d6f.jpg?im_w=480',
    preview:false,

  },
  {
    spotId:14,
    url:'https://a0.muscache.com/im/pictures/51b6c9de-d49f-4ce8-beff-99e10f5e75ef.jpg?im_w=480',
    preview:false,

  },
  {
    spotId:14,
    url:'https://a0.muscache.com/im/pictures/1d01d6c6-7050-4e79-a064-75972f3f1dfb.jpg?im_w=480',
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
