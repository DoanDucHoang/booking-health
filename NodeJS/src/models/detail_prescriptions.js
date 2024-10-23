// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Detail_Prescriptions extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//         // define association here
//         Detail_Prescriptions.belongsTo(models.Medicine, { foreignKey: 'medicineId' }) //1-1
//         Detail_Prescriptions.belongsTo(models.User, { foreignKey: 'prescriptionId' }) //1-1
        
//     }
//   };
//   Detail_Prescriptions.init({
//     prescriptionId: DataTypes.INTEGER,
//     medicineId: DataTypes.INTEGER,
//     usings: DataTypes.INTEGER,
//     quantity: DataTypes.INTEGER,
//     note: DataTypes.TEXT,
//   }, {
//     sequelize,
//     modelName: 'Detail_Prescriptions',
//   });
//   return Detail_Prescriptions;
// };