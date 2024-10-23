import unitMedicine from '../services/unitMedicine'
const getAllUnitMedicine = {
    findAll: async (req, res, next) => {
        try {
            const data = await unitMedicine.findAll()
            return res.json({success: true, data})
        } catch (error) {
            next(error)
        }
    },
}


module.exports = getAllUnitMedicine