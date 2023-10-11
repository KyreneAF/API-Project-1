'use strict';
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER

      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },

      country: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.DECIMAL(6,4)
      },
      lng: {
        type: Sequelize.DECIMAL(6,4)
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      price: {
        type: Sequelize.DECIMAL(6,2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.dropTable(options);
  }
};
