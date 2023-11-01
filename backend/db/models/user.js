'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Spot,{
        foreignKey:'ownerId',
        onDelete:'CASCADE'
      })
      User.hasMany(models.Booking,{
        foreignKey:'userId',
        onDelete:'CASCADE'
      })
      User.hasMany(models.Review,{
        foreignKey:'userId'

      })
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      firstName:{
        type:DataTypes.STRING,
        allowNull:false
      },
      lastName:{
        type:DataTypes.STRING,
        allowNull:false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      defaultScope:{
        attributes:{
          exclude:['hashedPassword','email','createdAt','updatedAt']
        }
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
    }
  );
  return User;
};
