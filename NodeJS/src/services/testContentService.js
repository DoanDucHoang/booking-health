import _ from "lodash";
import db from "../models/index";
import sequelize from "sequelize";

let createTestContentService = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.patientId || !data.nameTest || !data.quantity || !data.object) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                await db.Tests_Content.create({
                    patientId: data.patientId,
                    nameTest: data.nameTest,
                    quantity: data.quantity,
                    object: data.object,
                    note: data.note
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllTestsContentService = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Tests_Content.findAll({
                where: { patientId: id },
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

let deleteTestContentById = (testId) => { 
    return new Promise(async(resolve, reject) => {
        try {
            let testContent = await db.Tests_Content.findOne({
                where: {id: testId}
            })
            if(testContent){
                await db.Tests_Content.destroy({
                    where: {id: testId}
                })
            }
            resolve({
                errCode: 0,
                message: 'Delete the test succeed!'
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createTestContentService: createTestContentService,
    getAllTestsContentService: getAllTestsContentService,
    deleteTestContentById: deleteTestContentById,
}