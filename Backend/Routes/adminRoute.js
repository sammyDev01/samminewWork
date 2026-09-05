import express from "express";

import { addDoctor,adminLogin, allDoctors, adminGetQueue,appointmentAdmin, allConsultants, appointmentCancelled, allUsers, adminDashBoard, createAdmin,LoginAdmin} from "../controller/adminController.js";
import upload from "../middleWare/multer.js";
import authAdmin from "../middleWare/authAdmin.js";
import { changeAvailability } from "../controller/DoctorController.js";


const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', adminLogin)
adminRouter.post('/all-doctors',authAdmin, allDoctors)
adminRouter.post('/all-users',authAdmin, allUsers)
adminRouter.get('/all-consultants', authAdmin, allConsultants)
adminRouter.post('/change-availability',authAdmin, changeAvailability)
adminRouter.get('/appointmentAdminOne',authAdmin, appointmentAdmin)
adminRouter.post('/appointmentCancelledOne',authAdmin, appointmentCancelled)
adminRouter.get('/adminDashBoardOne',authAdmin, adminDashBoard)
adminRouter.post('/create-admin', createAdmin)
adminRouter.post('/login-admin',  LoginAdmin)
adminRouter.get('/adminGetQueue', authAdmin, adminGetQueue)



export default adminRouter;
