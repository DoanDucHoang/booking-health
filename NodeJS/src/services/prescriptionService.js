const { Op } = require('sequelize')
import db from "../models/index";

let createPrescription = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (!data.userId || !data.advice || !data.diagnostic) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!',
                })
            } else {
                await db.Prescription.create({
                    userId: data.userId,
                    advice: data.advice,
                    diagnostic: data.diagnostic,
                })

                resolve({
                    errCode: 0,
                    message: 'OK',
                })
            }         
        } catch (e) {
            reject(e)
        }
    })
}

let getPrescriptionById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Prescription.findOne({
                where: { userId: id },
            })
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createPrescription: createPrescription,
    getPrescriptionById: getPrescriptionById
}