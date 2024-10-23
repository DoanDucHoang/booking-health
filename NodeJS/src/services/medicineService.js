const { Op } = require('sequelize')
import db from "../models/index";

const getAllMedicine = {
    findAll: ({page, limit, orderBy, sortBy, keyword}) => new Promise(async (resolve, reject) => {
        try {
            
            const query = {}

            if (keyword) {
                query.name = {[Op.substring]: keyword}
            }

            const queries = {
                offset: (page - 1) * limit,
                limit
            }

            if (orderBy) {
                queries.order = [[orderBy, sortBy]]
            }
            
            const data = await db.Medicine.findAndCountAll({
                where: query,
                ...queries
            })
            
            const res = {
                totalPages: Math.ceil(data?.count / limit),
                totalItems: data?.count,
                errCode: 0,
                errMessage: 'OK',
                data: data?.rows
            }

            resolve(res)

        } catch (error) {
            reject(error)
        }
    }),
}

module.exports = getAllMedicine