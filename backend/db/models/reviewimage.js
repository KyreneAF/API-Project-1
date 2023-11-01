'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReviewImage.init({
    reviewId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Reviews',
        key:'id'
      }

    },
    url: {
      type:DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        const createdAt = this.getDataValue('createdAt');
        if (createdAt) {
          const year = createdAt.getFullYear();
          const month = String(createdAt.getMonth());
          const day = String(createdAt.getDate());
          const hours = String(createdAt.getHours());
          const minutes = String(createdAt.getMinutes());
          const seconds = String(createdAt.getSeconds());
          return year + '-' + month + '-' + day +' '+hours +':'+minutes +':'+seconds
        } else {
          return null;
        }
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        const updatedAt = this.getDataValue('updatedAt');
        if (updatedAt) {
          const year = updatedAt.getFullYear();
          const month = String(updatedAt.getMonth());
          const day = String(updatedAt.getDate());
          const hours = String(updatedAt.getHours());
          const minutes = String(updatedAt.getMinutes());
          const seconds = String(updatedAt.getSeconds());
          return year + '-' + month + '-' + day +' '+hours +':'+minutes +':'+seconds
        } else {
          return null;
        }
      },
    },
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
