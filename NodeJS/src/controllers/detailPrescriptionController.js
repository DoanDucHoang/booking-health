// import detailPrescription from '../services/detailPrescriptionService'

// let createDetailPrescription = async (req, res) => {
//     console.log(req.body);
//     try {
//         let info = await detailPrescription.createDetailPrescription(req.body)
//         return res.status(200).json(info)
//     } catch (e) {
//         console.log(e)
//         return res.status(200).json({
//             errCode: -1,
//             message: 'Error from server ...'
//         })
//     }
// }

// let getDetailPrescriptionById = async (req, res) => { 
//     try {
//         let info = await detailPrescription.getDetailPrescriptionById(req.query.id)
//         return res.status(200).json(info)
//     } catch (error) {
//         console.log(error);
//         return res.status(200).json({
//             errCode: -1,
//             message: 'Error from server ...'
//         })
//     }
// }

// module.exports = {
//     createDetailPrescription: createDetailPrescription,
//     getDetailPrescriptionById: getDetailPrescriptionById
// }