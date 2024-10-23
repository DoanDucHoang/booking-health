'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Receipt.belongsTo(models.Unit_Medicine, { foreignKey: 'unitId' }) //1-1
        Receipt.belongsTo(models.Service_Note, { foreignKey: 'serviceId' }) //1-1
        Receipt.belongsTo(models.Prescription, { foreignKey: 'prescriptionId' }) //1-1
        
    }
  };
  Receipt.init({
    userId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER,
    prescriptionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Receipt',
  });
  return Receipt;
};