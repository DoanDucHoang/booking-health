'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category_Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        
    }
  };
  Category_Test.init({
    name: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Category_Test',
  });
  return Category_Test;
};