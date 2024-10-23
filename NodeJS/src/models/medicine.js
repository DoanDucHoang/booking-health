'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Medicine.belongsTo(models.Unit_Medicine, { foreignKey: 'unitId' }) //1-1
        Medicine.belongsTo(models.Category_Medicine, { foreignKey: 'categoryId' }) //1-1
    }
  };
  Medicine.init({
    name: DataTypes.TEXT,
    content: DataTypes.TEXT,
    producer: DataTypes.TEXT,
    country: DataTypes.TEXT,
    numberR: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    unitId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};