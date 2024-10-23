import serviceNote from '../services/serviceNoteService'

let createServiceNote = async (req, res) => {
    console.log(req.body);
    try {
        let info = await serviceNote.createNewServiceNote(req.body)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ...'
        })
    }
}

let getServiceNoteById = async (req, res) => { 
    try {
        let info = await serviceNote.getServiceNote(req.query.id)
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
    createServiceNote: createServiceNote,
    getServiceNoteById: getServiceNoteById
}