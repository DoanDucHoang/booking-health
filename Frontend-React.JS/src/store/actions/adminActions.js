import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers, deleteUserService,
    editUserService, getTopDoctorHomeService, getAllDoctorsService, saveDetailDoctorService,
    getAllSpecialtyService, getAllClinicService, getSpecialtyByNameService, getAllCategoryTest,
    getAllTestContent, saveTestContent, saveServiceNote, getAllDiagnose, getAllMedicine, getAllUnitMedicine, getAllCategoryMedicine
} 
from '../../services/userService';

import { Toast, toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService('GENDER')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFail())
            }
        } catch (e) {
            dispatch(fetchGenderFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFail())
            }
        } catch (e) {
            dispatch(fetchPositionFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFail())
            }
        } catch (e) {
            dispatch(fetchRoleFail())
            console.log("Error: ", e)
        }
    }
}

// start -> doing -> end
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

//CREATE USER
export const fetchCreateNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            }
            else {
                toast.error("Create a new user error!")
                dispatch(saveUserFail())
            }
        } catch (e) {
            toast.error("Create a new user error!")
            dispatch(saveUserFail())
            console.log("Error: ", e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

//GET ALL USER
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL")
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            }
            else {
                toast.error("Get all users error!")
                dispatch(fetchAllUserFail())
            }
        } catch (e) {
            toast.error("Get all users error!")
            dispatch(fetchAllUserFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
})

export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

//DELETE USER
export const fetchDeleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            }
            else {
                toast.error("Delete the user error!")
                dispatch(deleteUserFail())
            }
        } catch (e) {
            toast.error("Delete the user error!")
            dispatch(deleteUserFail())
            console.log("Error: ", e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

// EDIT USER
export const fetchEditUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update the user succeed!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            }
            else {
                toast.error("Update the user error!")
                dispatch(editUserFail())
            }
        } catch (e) {
            toast.error("Update the user error!")
            dispatch(editUserFail())
            console.log("Error: ", e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

//GET TOP DOCTOR
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('') //truyen so ban ghi muon lay
            console.log('check res action: ', res)
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data))
            }
            else {
                toast.error("Get top doctors error!")
                dispatch(fetchTopDoctorFail())
            }
        } catch (e) {
            toast.error("Get top doctors error!")
            dispatch(fetchTopDoctorFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    dataDoctors: data
})

export const fetchTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})

//GET ALL CATEGORY TEST
export const fetchGetAllCategoryTest = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCategoryTest()
            if (res && res.errCode === 0) {
                dispatch(fetchALLCategoryTestSuccess(res.data))
            }
            else {
                toast.error("Get all doctors error!")
                dispatch(fetchALLCategoryTestFail())
            }
        } catch (e) {
            toast.error("Get all doctors error!")
            dispatch(fetchALLCategoryTestFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchALLCategoryTestSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CT_SUCCESS,
    dataCT: data
})

export const fetchALLCategoryTestFail = () => ({
    type: actionTypes.FETCH_ALL_CT_FAILED
})

export const fetchGetAllTestContent = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllTestContent()
            if (res && res.errCode === 0) {
                dispatch(fetchALLTestContentSuccess(res.data))
            }
            else {
                toast.error("Get all doctors error!")
                dispatch(fetchALLTestContentFail())
            }
        } catch (e) {
            toast.error("Get all doctors error!")
            dispatch(fetchALLTestContentFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchALLTestContentSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_TEST_CONTENT_SUCCESS,
    dataTestContent: data
})

export const fetchALLTestContentFail = () => ({
    type: actionTypes.FETCH_ALL_TEST_CONTENT_FAILED
})

//GET ALL DIAGNOSE
export const fetchGetAllDiagnose = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDiagnose(data)
            if (res && res.data.errCode === 0) {
                dispatch(fetchALLDiagnoseSuccess(res.data))
            }
            else {
                toast.error("Get all diagnose error!")
                dispatch(fetchALLDiagnoseFail())
            }
        } catch (e) {
            toast.error("Get all diagnose error!")
            dispatch(fetchALLDiagnoseFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchALLDiagnoseSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DIAGNOSE_SUCCESS,
    dataDiagnose: data
})

export const fetchALLDiagnoseFail = () => ({
    type: actionTypes.FETCH_ALL_DIAGNOSE_FAILED
})

export const fetchGetAllMedicine = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllMedicine(data)
            if (res && res.data.errCode === 0) {
                dispatch(fetchALLMedicineSuccess(res.data))
            }
            else {
                toast.error("Get all medicine error!")
                dispatch(fetchALLMedicineFail())
            }
        } catch (e) {
            toast.error("Get all medicine error!")
            dispatch(fetchALLMedicineFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchALLMedicineSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_MEDICINE_SUCCESS,
    dataMedicine: data
})

export const fetchALLMedicineFail = () => ({
    type: actionTypes.FETCH_ALL_MEDICINE_FAILED
})

export const fetchGetAllUnitMedicine = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUnitMedicine()
            if (res && res.data.errCode === 0) {
                dispatch(fetchALLUnitMedicineSuccess(res.data))
            }
            else {
                toast.error("Get all unit medicine error!")
                dispatch(fetchALLUnitMedicineFail())
            }
        } catch (e) {
            toast.error("Get all unit medicine error!")
            dispatch(fetchALLUnitMedicineFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchALLUnitMedicineSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_UNIT_MEDICINE_SUCCESS,
    dataUnit: data
})

export const fetchALLUnitMedicineFail = () => ({
    type: actionTypes.FETCH_ALL_UNIT_MEDICINE_FAILED
})

export const fetchGetAllCategoryMedicine = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCategoryMedicine()
            if (res && res.data.errCode === 0) {
                dispatch(fetchALLCategoryMedicineSuccess(res.data))
            }
            else {
                toast.error("Get all unit medicine error!")
                dispatch(fetchALLCategoryMedicineFail())
            }
        } catch (e) {
            toast.error("Get all unit medicine error!")
            dispatch(fetchALLCategoryMedicineFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchALLCategoryMedicineSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CATEGORY_MEDICINE_SUCCESS,
    dataCM: data
})

export const fetchALLCategoryMedicineFail = () => ({
    type: actionTypes.FETCH_ALL_CATEGORY_MEDICINE_FAILED
})

//GET ALL DOCTORS
export const fetchGetAllDoctors= () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService()
            if (res && res.errCode === 0) {
                dispatch(fetchALLDoctorSuccess(res.data))
            }
            else {
                toast.error("Get all doctors error!")
                dispatch(fetchALLDoctorFail())
            }
        } catch (e) {
            toast.error("Get all doctors error!")
            dispatch(fetchALLDoctorFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchALLDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    dataDr: data
})

export const fetchALLDoctorFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
})

//SAVE INFO DOCTORS
export const fetchSaveInfoDoctors = (dataInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(dataInput)
            if (res && res.errCode === 0) {
                toast.success("Save info detail doctor succeed!")
                dispatch(fetchSaveInfoDoctorSuccess())
            }
            else {
                toast.error("Save info detail doctor error!")
                dispatch(fetchSaveInfoDoctorFail())
            }
        } catch (e) {
            toast.error("Save info detail doctor error!")
            dispatch(fetchSaveInfoDoctorFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchSaveInfoDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS
})

export const fetchSaveInfoDoctorFail = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
})

//SAVE INFO TESTS
export const fetchSaveTestContent = (dataInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveTestContent(dataInput)
            if (res && res.errCode === 0) {
                toast.success("Save info test content succeed!")
                dispatch(fetchSaveTestContentSuccess())
            }
            else {
                toast.error("Save info test content error!")
                dispatch(fetchSaveTestContentFail())
            }
        } catch (e) {
            toast.error("Save info test content error!")
            dispatch(fetchSaveTestContentFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchSaveTestContentSuccess = () => ({
    type: actionTypes.SAVE_TEST_CONTENT_SUCCESS
})

export const fetchSaveTestContentFail = () => ({
    type: actionTypes.SAVE_TEST_CONTENT_FAILED
})

//SAVE INFO SERVICE
export const fetchSaveServiceNote = (dataInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveServiceNote(dataInput)
            if (res && res.errCode === 0) {
                toast.success("Save info service succeed!")
                dispatch(fetchSaveServiceNoteSuccess())
            }
            else {
                toast.error("Save info service error!")
                dispatch(fetchSaveServiceNoteFail())
            }
        } catch (e) {
            toast.error("Save info service error!")
            dispatch(fetchSaveServiceNoteFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchSaveServiceNoteSuccess = () => ({
    type: actionTypes.SAVE_SERVICE_NOTE_SUCCESS
})

export const fetchSaveServiceNoteFail = () => ({
    type: actionTypes.SAVE_SERVICE_NOTE_FAILED
})

//SAVE INFO DOCTORS
export const fetchSearchSpecialty = (nameInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await getSpecialtyByNameService(nameInput)
            if (res && res.errCode === 0) {
                dispatch(fetchSearchSpecialtySuccess(res.data))
                console.log('check fetch search : ', res.data)
            }
            else {
                dispatch(fetchSearchSpecialtyFail())
            }
        } catch (e) {
            dispatch(fetchSearchSpecialtyFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchSearchSpecialtySuccess = (data) => ({
    type: actionTypes.SEARCH_SPECIALTY_SUCCESS,
    dataSpecialty: data
})

export const fetchSearchSpecialtyFail = () => ({
    type: actionTypes.SEARCH_SPECIALTY_FAILED
})

//GET ALL SCHEDULE
export const fetchGetAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch(fetchGetAllScheduleSuccess(res.data))
            }
            else {
                toast.error("Get all schedules error!")
                dispatch(fetchGetAllScheduleFail())
            }
        } catch (e) {
            toast.error("Get all schedules error!")
            dispatch(fetchGetAllScheduleFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchGetAllScheduleSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS,
    dataTime: data
})

export const fetchGetAllScheduleFail = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED
})

//Get DOCTOR_PRICE
export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START})
            let resPrice = await getAllCodeService('PRICE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resProvince = await getAllCodeService('PROVINCE')
            let resSpecialty = await getAllSpecialtyService()
            let resClinic = await getAllClinicService()

            if (resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode === 0
                && resClinic && resClinic.errCode === 0 &&
                resProvince && resProvince.errCode === 0 && resSpecialty && resSpecialty.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInfoSuccess(data))
            }
            else {
                dispatch(fetchRequiredDoctorInfoFail())
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInfoFail())
            console.log("Error: ", e)
        }
    }
}

export const fetchRequiredDoctorInfoSuccess = (dataRequiredInfo) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: dataRequiredInfo,
})

export const fetchRequiredDoctorInfoFail = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})