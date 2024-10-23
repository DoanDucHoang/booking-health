import testResult from '../services/testResultService'

let createTestResult = async (req, res) => {
    console.log(req.body);
    try {
        let info = await testResult.createNewTestResult(req.body)
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
    createTestResult: createTestResult,
}