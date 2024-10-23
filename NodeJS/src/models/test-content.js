'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tests_Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Tests_Content.belongsTo(models.User, { foreignKey: 'patientId' }) //1-1
    }
  };
  Tests_Content.init({
    patientId: DataTypes.INTEGER,
    nameTest: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    object: DataTypes.TEXT,
    note: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Tests_Content',
  });
  return Tests_Content;
};