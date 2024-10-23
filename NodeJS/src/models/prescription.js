'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Prescription.belongsTo(models.User, { foreignKey: 'userId' }) //1-1
        
    }
  };
  Prescription.init({
    userId: DataTypes.INTEGER,
    advice: DataTypes.TEXT,
    diagnostic: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Prescription',
  });
  return Prescription;
};