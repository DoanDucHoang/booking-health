'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unit_Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
  };
  Unit_Medicine.init({
    name: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Unit_Medicine',
  });
  return Unit_Medicine;
};