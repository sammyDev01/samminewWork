import express from "express";

import { createConsultation, getPatientConsultations, getDoctorConsultations, getConsultation, startConsultation, updateConsultation, completeConsultation} from "../controller/ConsultationController.js";


import authUser from "../middleWare/authUser.js";

const consultationRouter = express.Router();


// Create consultation
consultationRouter.post("/create", authUser, createConsultation);


// Patient consultations
consultationRouter.get("/patient", authUser, getPatientConsultations);


// Doctor consultations
consultationRouter.get("/doctor", authUser, getDoctorConsultations);


// Single consultation
consultationRouter.get( "/:id", authUser, getConsultation);


// Start consultation
consultationRouter.put("/start/:id", authUser, startConsultation);


// Update consultation
consultationRouter.put("/update/:id", authUser, updateConsultation);


// Complete consultation
consultationRouter.put("/complete/:id", authUser,completeConsultation);

export default consultationRouter;