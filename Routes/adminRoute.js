import express from "express";

import { addDoctor,adminLogin, allDoctors, appointmentAdmin, appointmentCancelled ,adminDashBoard} from "../controller/adminController.js";
import upload from "../middleWare/multer.js";
import authAdmin from "../middleWare/authAdmin.js";
import { changeAvailability } from "../controller/doctorController.js";


const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', adminLogin)
adminRouter.post('/all-doctors',authAdmin, allDoctors)
adminRouter.post('/change-availability',authAdmin, changeAvailability)
adminRouter.get('/appointmentAdminOne',authAdmin, appointmentAdmin)
adminRouter.post('/appointmentCancelledOne',authAdmin, appointmentCancelled)
adminRouter.get('/adminDashBoardOne',authAdmin, adminDashBoard)



export default adminRouter;
