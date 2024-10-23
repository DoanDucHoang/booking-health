import prescription from '../services/prescriptionService'

let createPrescription = async (req, res) => {
    console.log(req.body);
    try {
        let info = await prescription.createPrescription(req.body)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ...'
        })
    }
}

let getPrescriptionById = async (req, res) => { 
    try {
        let info = await prescription.getPrescriptionById(req.query.id)
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
    createPrescription: createPrescription,
    getPrescriptionById: getPrescriptionById
}