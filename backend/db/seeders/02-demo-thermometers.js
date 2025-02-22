'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Thermometers';
    return queryInterface.bulkInsert(options, [
      {
        value: 123,
        max: 2000000,
        steps: 10,
        format: "$",
        userId: 1
      },
      {
        value: 456,
        max: 2000000,
        steps: 10,
        format: "$",
        userId: 2
      },
      {
        value: 123,
        max: 2000000,
        steps: 10,
        format: "$",
        userId: 3
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Thermometers';
    return queryInterface.bulkDelete(options);
  }
};
