import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController"
import handbookController from '../controllers/handbookController'
import testResultController from '../controllers/testResultController'
import categoryTestController from '../controllers/categoryTestController'
import testsContentController from '../controllers/testsContentController'
import serviceNoteController from '../controllers/serviceNoteController'
import diagnoseController from '../controllers/diagnoseController'
import medicineController from '../controllers/medicineController'
import unitMedicineController from '../controllers/unitMedicine'
import categoryMedicine from '../controllers/categoryMedicine'
import prescriptionController from '../controllers/prescriptionController'
import detailPrescriptionController from '../controllers/detailPrescriptionController'

let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.getAboutPage)
    router.get('/crud', homeController.getCRUD) //get all user
    
    router.post('/post-crud', homeController.postCRUD) // add user
    router.get('/get-crud', homeController.displayGetCRUD) // view all user
    router.get('/edit-crud', homeController.getEditCRUD) //get data need edit
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)

    //rest-api
    //USER
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.get('/api/allcode', userController.getAllCode)

    //DOCTOR
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctors', doctorController.getAllDoctors)
    router.post('/api/save-info-doctors', doctorController.postInfoDoctors)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.post('/api/bulk-create-schedule', doctorController.postScheduleDoctors)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate)
    router.get('/api/get-extra-info-doctor-by-id', doctorController.getExtraInfoDoctorById)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)
    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor)
    router.post('/api/send-remedy', doctorController.sendRemedy)
    router.post('/api/cancel-patient', doctorController.cancelPatient)

    //PATIENT BOOKING
    router.post('/api/patient-book-appointment', patientController.postBookAppointment)
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment)

    //SPECIALTY
    router.post('/api/create-new-specialty', specialtyController.createSpecialty)
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty)
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById)
    router.get('/api/get-specialty-by-name', specialtyController.getSpecialtyByName)

    //CLINIC
    router.post('/api/create-new-clinic', clinicController.createClinic)
    router.get('/api/get-all-clinic', clinicController.getAllClinic)
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById)

    //HANDBOOK
    router.post('/api/create-new-handbook', handbookController.createHandbook)
    router.get('/api/get-all-handbook', handbookController.getAllHandbook)
    router.get('/api/get-detail-handbook-by-id', handbookController.getDetailHandbookById)

    //TEST RESULT
    router.post('/api/create-new-test-result', testResultController.createTestResult)

    //CATEGORY TEST
    router.get('/api/get-test', categoryTestController.getAllCategoryTest)

    //TEST CONTENT
    router.get('/api/get-test-content', testsContentController.getAllTestContent)
    router.post('/api/create-test-content', testsContentController.createTestContent)
    router.delete('/api/delete-test-content', testsContentController.deleteTestContentById)
    
    //SERVICE NOTE
    router.post('/api/create-service-note', serviceNoteController.createServiceNote)
    router.get('/api/get-service-note-by-id', serviceNoteController.getServiceNoteById)

    //DIAGNOSE
    // router.get('/api/get-diagnose', diagnoseController.getAllDiagnose)
    router.get('/api/get-diagnose', diagnoseController.findAll)

    //MEDICINE
    router.get('/api/get-medicine', medicineController.findAll)

    //UNIT MEDICINE
    router.get('/api/get-unit-medicine', unitMedicineController.findAll)
    
    //CATEGORY MEDICINE
    router.get('/api/get-category-medicine', categoryMedicine.findAll)
    
    //prescription
    router.post('/api/create-prescription', prescriptionController.createPrescription)
    router.get('/api/get-prescription-by-id', prescriptionController.getPrescriptionById)
    
    // //prescription
    // router.post('/api/create-detail-prescription', detailPrescriptionController.createDetailPrescription)
    // router.get('/api/get-detail-prescription-by-id', detailPrescriptionController.getDetailPrescriptionById)

    return app.use("/", router)
}

module.exports = initWebRoutes;