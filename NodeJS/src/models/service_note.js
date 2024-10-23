'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service_Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Service_Note.belongsTo(models.User, { foreignKey: 'userId' }) //1-1
        Service_Note.belongsTo(models.Specialty, { foreignKey: 'specialtyId' }) //1-1
        
    }
  };
  Service_Note.init({
    userId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,
    room: DataTypes.INTEGER,
    diagnostic: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Service_Note',
  });
  return Service_Note;
};