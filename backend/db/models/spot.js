'use strict';
// const {
//   Model
// } = require('sequelize');
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(models.Booking,{
        foreignKey:'spotId',
        onDelete:'CASCADE'
      })
      Spot.hasMany(models.Review,{
        foreignKey:'spotId',
        onDelete:'CASCADE'
      })
      Spot.hasMany(models.SpotImage,{
        foreignKey:'spotId',
        onDelete:'CASCADE'
      })
      Spot.belongsTo(models.User,{
        foreignKey:'ownerId',
      })
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Users',
        key:'id',
      }
    },
    address: {
      type:DataTypes.STRING
    },
    city: {
      type:DataTypes.STRING
    },
    state: {
      type:DataTypes.STRING
    },
    country: {
      type:DataTypes.STRING
    },
    lat: {
      type:DataTypes.DECIMAL
    },
    lng: {
      type:DataTypes.DECIMAL
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
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

    price: {
      type: DataTypes.DECIMAL,
    },
  },
 {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
