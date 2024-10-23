import db from "../models/index";

let createNewTestResult = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (!data.userId || !data.doctorId || !data.diagnostic || !data.quality) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!',
                })
            } else {
                await db.Test_Result.create({
                    userId: data.userId,
                    doctorId: data.doctorId,
                    diagnostic: data.diagnostic,
                    quality: data.quality,
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

module.exports = {
    createNewTestResult: createNewTestResult,
}