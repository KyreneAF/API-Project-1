'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User,{
        foreignKey:'userId'
      })
      Booking.belongsTo(models.Spot,{
        foreignKey:'spotId'
      })
    }
  }

  Booking.init({
    spotId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Spots',
        key:'id',
      }
    },
    userId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Users',
        key:'id',
      }
    },
    startDate:{
      type:DataTypes.DATE,
      allowNull:false,
    },
    endDate: {
      type:DataTypes.DATE,
      allowNull:false,
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
  },
  {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
