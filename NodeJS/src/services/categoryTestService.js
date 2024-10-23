import _ from "lodash";
import db from "../models/index";
import sequelize from "sequelize";

let getAllCategoryTest = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Category_Test.findAll({})
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
    getAllCategoryTest: getAllCategoryTest,
}