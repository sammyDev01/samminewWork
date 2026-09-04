import Consultation from "../models/ConsultationModel.js";
import Appointment from "../models/appointmentModel.js";

// ===============================
// CREATE CONSULTATION
// ===============================
export const createConsultation = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const existingConsultation = await Consultation.findOne({
      appointmentId,
    });

    if (existingConsultation) {
      return res.status(200).json({
        success: true,
        consultation: existingConsultation,
      });
    }

    const consultation = await Consultation.create({
      appointmentId,
      patientId: appointment.userId,
      doctorId: appointment.doctorId,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Consultation created successfully",
      consultation,
    });
  } catch (error) {
    console.error("Create consultation error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// GET PATIENT CONSULTATIONS
// ===============================
export const getPatientConsultations = async (req, res) => {
  try {
    const patientId = req.userId;

    const consultations = await Consultation.find({
      patientId,
    })
      .populate("doctorId", "name email specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      consultations,
    });
  } catch (error) {
    console.error("Get patient consultations error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// GET DOCTOR CONSULTATIONS
// ===============================
export const getDoctorConsultations = async (req, res) => {
  try {
    const doctorId = req.userId;

    const consultations = await Consultation.find({
      doctorId,
    }).populate("patientId", "name email phone matNum level").populate("doctorId", "name specialization").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      consultations,
    });
  } catch (error) {
    console.error("Get doctor consultations error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// GET SINGLE CONSULTATION
// ===============================
export const getConsultation = async (req, res) => {
  try {
    const { id } = req.params;

    const consultation = await Consultation.findById(id)
      .populate("patientId", "name email phone")
      .populate("doctorId", "name email specialization")
      ;

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    res.status(200).json({
      success: true,
      consultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// START CONSULTATION
// ===============================
export const startConsultation = async (req, res) => {
  try {
    const { id } = req.params;

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    consultation.status = "in-consultation";
    consultation.startedAt = new Date();

    await consultation.save();

    res.status(200).json({
      success: true,
      message: "Consultation started",
      consultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// UPDATE CONSULTATION
// ===============================
export const updateConsultation = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      symptoms,
      diagnosis,
      notes,
      treatment,
      prescription,
    } = req.body;

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    consultation.symptoms = symptoms;
    consultation.diagnosis = diagnosis;
    consultation.notes = notes;
    consultation.treatment = treatment;
    consultation.prescription = prescription;

    await consultation.save();

    res.status(200).json({
      success: true,
      message: "Consultation updated successfully",
      consultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// COMPLETE CONSULTATION
// ===============================
export const completeConsultation = async (req, res) => {
  try {
    const { id } = req.params;

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found",
      });
    }

    consultation.status = "completed";
    consultation.completedAt = new Date();

    await consultation.save();

    // Also complete appointment
    await Appointment.findByIdAndUpdate(
      consultation.appointmentId,
      {
        status: "completed",
      }
    );

    res.status(200).json({
      success: true,
      message: "Consultation completed successfully",
      consultation,
    });
  } catch (error) {
    console.error("Complete consultation error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};