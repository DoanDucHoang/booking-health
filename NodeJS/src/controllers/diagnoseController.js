import diagnose from '../services/diagnoseService'
const getAllDiagnose = {
    findAll: async (req, res, next) => {
        try {
            const { page = 1, limit = 3, orderBy = 'id', sortBy = 'asc', keyword } = req.query

            const data = await diagnose.findAll({
                page: +page ? +page : 1,
                limit: +limit ? +limit : 3,
                orderBy,
                sortBy,
                keyword
            })
            return res.json({success: true, data})
        } catch (error) {
            next(error)
        }
    },
}


module.exports = getAllDiagnose