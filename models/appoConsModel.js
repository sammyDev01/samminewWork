import mongoose from "mongoose";

const appointmentConsultationSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointments",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },

    symptoms: {
      type: String,
      default: "",
    },

    diagnosis: {
      type: String,
      default: "",
    },

    treatment: {
      type: String,
      default: "",
    },

    prescription: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["waiting", "in-consultation", "completed"],
      default: "waiting",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const appointmentConsultationModel =
  mongoose.models.appointmentConsultation ||
  mongoose.model(
    "appointmentConsultation",
    appointmentConsultationSchema
  );

export default appointmentConsultationModel;