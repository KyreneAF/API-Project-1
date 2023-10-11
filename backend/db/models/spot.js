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

    price: {
      type:DataTypes.DECIMAL
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
