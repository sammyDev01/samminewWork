import express from 'express'

import authUser from '../middleWare/authUser.js'
import authDoctor from '../middleWare/authDoctor.js'
import {generateQueue, getUserQueue, getDoctorQueue, adminGetQueueStats,attendPatient, completePatient} from '../controller/QueueControoller.js'

import authAdmin from '../middleWare/authAdmin.js'

const QueueRouter = express.Router()

QueueRouter.post("/generateQueue", authUser, generateQueue)
QueueRouter.get("/user", authUser, getUserQueue)
QueueRouter.put("/attend", authDoctor, attendPatient)
QueueRouter.post("/complete", authDoctor, completePatient)
QueueRouter.get("/doctor", authDoctor, getDoctorQueue)
QueueRouter.get("/admin/stats",authAdmin,adminGetQueueStats);



export default QueueRouter;