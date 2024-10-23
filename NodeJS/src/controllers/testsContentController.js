import testContentService from '../services/testContentService'

let createTestContent = async (req, res) => {
    console.log(req.body);
    try {
        let info = await testContentService.createTestContentService(req.body)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ...'
        })
    }
}

let getAllTestContent = async (req, res) => {
    try {
        let info = await testContentService.getAllTestsContentService(req.query.id)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ...'
        })
    }
}

let deleteTestContentById = async (req, res) => { 
    try {
        let info = await testContentService.deleteTestContentById(req.body.id)
        return res.status(200).json(info)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ...'
        })
    }
}

module.exports = {
    getAllTestContent: getAllTestContent,
    createTestContent: createTestContent,
    deleteTestContentById: deleteTestContentById
}