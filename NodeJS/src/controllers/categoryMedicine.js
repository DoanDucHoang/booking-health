import categoryMedicine from '../services/categoryMedicine'
const getAllCategoryMedicine = {
    findAll: async (req, res, next) => {
        try {
            const data = await categoryMedicine.findAll()
            return res.json({success: true, data})
        } catch (error) {
            console.log(error)
            next(error)
        }
    },
}


module.exports = getAllCategoryMedicine