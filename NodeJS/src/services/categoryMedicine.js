const { Op } = require('sequelize')
import db from "../models/index";

const getAllCategoryMedicine = {
    findAll: () => new Promise(async (resolve, reject) => {
        try {
            const data = await db.Category_Medicine.findAll({})
            
            const res = {
                errCode: 0,
                errMessage: 'OK',
                data: data
            }

            resolve(res)

        } catch (error) {
            reject(error)
        }
    }),
}

module.exports = getAllCategoryMedicine