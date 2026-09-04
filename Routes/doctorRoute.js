import express from 'express'
import {DoctorList, doctorLogin, appointentForDoctor, appointmentComplete, appointmentCancel, doctorDashBoard, doctorProfile, updateDoctorProfile} from '../controller/DoctorController.js'
import authDoctor from '../middleWare/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', DoctorList)
doctorRouter.post('/login', doctorLogin)   
doctorRouter.get('/appointentrDoctor',authDoctor, appointentForDoctor)   
doctorRouter.post('/cancelAppointentForDoctor',authDoctor, appointmentCancel)   
doctorRouter.post('/completeAppointentForDoctor',authDoctor, appointmentComplete)
doctorRouter.get('/dashBoardForDoctor',authDoctor, doctorDashBoard)
doctorRouter.get('/doctorProfile',authDoctor, doctorProfile)
doctorRouter.put('/updateForDoctor',authDoctor, updateDoctorProfile)


export default doctorRouter
