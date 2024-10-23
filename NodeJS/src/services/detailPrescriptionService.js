// const { Op } = require('sequelize')
// import db from "../models/index";

// let createDetailPrescription = (data) => {
//     return new Promise( async (resolve, reject) => {
//         try {
//             if (!data.prescriptionId || !data.medicineId || !data.usings || !data.quantity || !data.note ) {
//                 resolve({
//                     errCode: 1,
//                     errMessage: 'Missing required parameters!',
//                 })
//             } else {
//                 await db.Detail_Prescription.create({
//                     prescriptionId: data.prescriptionId,
//                     medicineId: data.medicineId,
//                     usings: data.usings,
//                     quantity: data.quantity,
//                     note: data.note,
//                 })

//                 resolve({
//                     errCode: 0,
//                     message: 'OK',
//                 })
//             }         
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

// let getDetailPrescriptionById = (id) => {
//     return new Promise(async(resolve, reject) => {
//         try {
//             let data = await db.Detail_Prescription.findOne({
//                 where: { prescriptionId: id },
//             })
//             resolve({
//                 errCode: 0,
//                 errMessage: 'OK',
//                 data
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }


// module.exports = {
//     createDetailPrescription: createDetailPrescription,
//     getDetailPrescriptionById: getDetailPrescriptionById
// }