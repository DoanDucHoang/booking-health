import db from "../models/index";

let createNewServiceNote = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (!data.userId || !data.specialtyId || !data.room || !data.diagnostic) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!',
                })
            } else {
                await db.Service_Note.create({
                    userId: data.userId,
                    specialtyId: data.specialtyId,
                    room: data.room,
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

let getServiceNote = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Service_Note.findOne({
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
    createNewServiceNote: createNewServiceNote,
    getServiceNote: getServiceNote
}