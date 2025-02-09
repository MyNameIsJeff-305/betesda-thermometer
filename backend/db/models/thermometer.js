'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thermometer extends Model {
    static associate(models) {
      Thermometer.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE"
      })
    }
  }
  Thermometer.init({
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2000000
    },
    steps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 200
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "$"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'Thermometer',
  });
  return Thermometer;
};