// import mongoose from "mongoose";

// const consultationSchema = new mongoose.Schema(
//   {
//     // appointmentId: {type: mongoose.Schema.Types.ObjectId, ref: "appointments", required: true,},
//     queueId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Queue",
//       required: true,
//     },
//     patientId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},

//     doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "doctor", required: true},

//     symptoms: {type: String, default: ""},

//     diagnosis: {type: String, default: ""},

//     notes: {type: String, default: ""},

//     treatment: { type: String, default: ""},

//     prescription: {type: String, default: ""},

//     status: { type: String, enum: ["pending", "in-consultation", "completed"], default: "pending"},

//     startedAt: {type: Date},

//     completedAt: {type: Date}
//   }
// );




// const Consultation = mongoose.model("Consultation",consultationSchema);

// export default Consultation;
// const consultationModel = mongoose.models.Consultation || mongoose.model("Consultation", consultationSchema);

// export default consultationModel;

import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    queueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "queue",
      required: true,
    },

    patientId: {
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
      enum: [
        "in-consultation",
        "completed",
      ],
      default: "in-consultation",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const ConsultationModel = mongoose.model(
  "Consultation",
  consultationSchema
);

export default ConsultationModel;