import categoryTest from '../services/categoryTestService'

let getAllCategoryTest = async (req, res) => {
    try {
        let info = await categoryTest.getAllCategoryTest(req.body)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ...'
        })
    }
}

module.exports = {
    getAllCategoryTest: getAllCategoryTest,
}