import doctorModel from '../models/DoctorsModel.js';
import QueueModel from '../models/QueueModel.js'
import userModel from '../models/UserModel.js';
import mongoose from 'mongoose'
import Consultation from '../models/ConsultationModel.js';



// ======================================
// GENERATE QUEUE
// ======================================
const generateQueue = async (req, res) => {
  try {
    const userId = req.userId;
   
    console.log(userId)
 // Find an available doctor
    const doctors = await doctorModel.find({});

     if (!doctors || doctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No doctors available right now",
      });
    }



    let doctor = null;

    for (const currentDoctor of doctors ){
      const currentPatient = await QueueModel.findOne({
      doctorData: currentDoctor._id,
      status: "in-consultation"   
  });

        if (!currentPatient) {
           doctor = currentDoctor;
          break;
        }
        }
  if (!doctor) {
  return res.status(400).json({
    success: false,
    message: "No doctor is currently available"
  });
}

    // Today's date
    const today = new Date().toISOString().split("T")[0];
    // Check if patient already has an active queue today
  
   

    console.log("DOCTOR ID:", );

    // Get last queue number
    const lastQueue = await QueueModel.findOne({
      queueDate: new Date().toISOString().split("T")[0],
    }).sort({
      queueNumber: -1,
    });

    const queueNumber = lastQueue
      ? lastQueue.queueNumber + 1 : 1;

    // Create queue
    const queue = await QueueModel.create({
      userData: userId,
      doctorData: doctor._id,
      queueNumber: queueNumber,
      queueDate: today,
      status: "waiting",
    });
   
    
    console.log(queue);
    
    await queue.save();

    console.log("SAVED QUEUE:", queue);

    return res.status(201).json({
      success: true,
      message: "Queue generated",
      queue: queue,
    });
  } catch (error) {
    console.error("Generate Queue Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================
// GET USER'S CURRENT QUEUE
// ======================================
const getUserQueue = async (req, res) => {
  try {
    const userId = req.userId;

    const queue = await QueueModel.findOne({
      userData: userId,
      status: { $in: ["waiting", "in-consultation"] },
    }).populate("userData", "name email phone").populate("doctorData", "name ,email,specialization")
      // .sort({ createdAt: -1 })


    return res.status(200).json({
      success: true,
      queue,
      
    });
  } catch (error) {
    console.error("Get User Queue Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================
// GET DOCTOR QUEUE
// ======================================
const getDoctorQueue = async (req, res) => {
  try {
    const doctorId = req.doctorId.id;


  console.log("Doctor ID from token:", doctorId);

    if (!doctorId) {
      return res.status(401).json({
        success: false,
        message: "Doctor ID not found in token",
      });
    }

    const queue = await QueueModel.find({
       status: ["waiting", "in-consultation"]}).populate("userData","name email phone").populate("doctorData","name email").sort({queueNumber: 1,});

      const queueSta = await QueueModel.find({ 
        status: "waiting"}).populate("userData","name email phone").populate("doctorData","name email").sort({queueNumber: 1,})
    

    return res.status(200).json({
      success: true,
      queue,
      waitingCount:queue.length
    });
  } catch (error) {
    console.error("Get Doctor Queue Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================
// ATTEND PATIENT
// ======================================
const attendPatient = async (req, res) => {
  try {
    const doctorId = req.doctorId.id;
    const { queueId } = req.body;

    console.log("DOCTOR ID:",doctorId);
    console.log("QUEUE ID:",queueId);

      if (!doctorId) {
      return res.status(401).json({
        success: false,
        message: "Doctor ID not found",
      });
    }

      if (!queueId) {
      return res.status(400).json({
        success: false,
        message: "Queue ID is required"
      });
    }
    if (!mongoose.Types.ObjectId.isValid(queueId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid queue ID",
      });
    }


    // Find waiting patient belonging to this doctor
    const queue =
      await QueueModel.findById(
          queueId
      );


    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found or patient is no longer waiting",
      });
    }

     console.log(
      "Queue doctorData:",
      queue.doctorData?.toString()
    );

    if (
      !queue.doctorData ||
      queue.doctorData.toString() !==
        doctorId.toString()
    ) {
      console.log(
        "DOCTOR DOES NOT MATCH"
      );

      return res.status(403).json({
        success: false,
        message:
          "This patient is not assigned to this doctor",
        queueDoctor:
          queue.doctorData,
        loggedInDoctor:
          doctorId,
      });
    }

    // =================================================
    // STEP 4: CHECK STATUS
    // =================================================

    if (queue.status !== "waiting") {
      console.log(
        "PATIENT IS NOT WAITING"
      );

      return res.status(400).json({
        success: false,
        message:
          `Patient status is "${queue.status}", not "waiting"`,
      });
    }

       // =================================================
    // STEP 5: CHECK IF DOCTOR ALREADY HAS PATIENT
    // =================================================

    const currentPatient =
      await QueueModel.findOne({
        doctorData: doctorId,
        status: "in-consultation",
      });

    if (currentPatient) {
      return res.status(400).json({
        success: false,
        message:
          "You are already attending another patient",
        currentPatient,
      });
    }

    queue.status = "in-consultation";
    queue.attendedAt = new Date();

    await queue.save();

       // ============================================
    // CREATE CONSULTATION
    // ============================================

    let consultation = await Consultation.findOne({
      queueId: queue._id,
    });

    // Prevent duplicate consultation
    if (!consultation) {
      consultation = await Consultation.create({
        queueId: queue._id,

        patientId: queue.userData,

        doctorId: queue.doctorData,

        status: "in-consultation",

        startedAt: new Date(),

        symptoms: "",
        diagnosis: "",
        notes: "",
        treatment: "",
        prescription: "",
      });
    }

    console.log(
      "CONSULTATION CREATED:",
      consultation
    );

    const updatedQueue = await QueueModel.findById(queue._id).populate("userData", "name email phone").populate("doctorData", "name specialization");

     console.log(
      "QUEUES FOUND:",
      updatedQueue
    );
    return res.status(200).json({
      success: true,
      message: "Patient is now being attended",
      queue: updatedQueue, 
      consultation,
    });
  } catch (error) {
    console.error("Attend Patient Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================
// COMPLETE PATIENT
// ======================================
const completePatient = async (req, res) => {
  try {
    const doctorId = req.doctorId.id;
    const { queueId } = req.body;

     if (!doctorId) {
      return res.status(401).json({
        success: false,
        message: "Doctor ID not found"
      });
    }
    const queue = await QueueModel.findById(queueId);

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Patient is not currently being attended",
      });
    }



    // Check doctor
    if (!queue.doctorData || queue.doctorData.toString() !== doctorId.toString()) {
      return res.status(403).json({
        success: false,
        message: "This patient is not assigned to this doctor"
      });
    }

    // Check status
    if (queue.status !== "in-consultation") {
      return res.status(400).json({
        success: false,
        message:
          `Cannot complete patient. Current status is ${queue.status}`
      });
    }

    queue.status = "completed";
    queue.completedAt = new Date();

    await queue.save();

    return res.status(200).json({
      success: true,
      message: "Patient consultation completed",
      queue,
    });
  } catch (error) {
    console.error("Complete Patient Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const adminGetQueueStats = async (req, res) => {
  try {

     // Get ALL queues from MongoDB
    const queue = await QueueModel.find({}).populate("userData", "name email phone").populate("doctorData","name email specialization").sort({ createdAt: -1 });
    console.log("QUEUES FOUND:", queue.length);


    const today = new Date()
      .toISOString()
      .split("T")[0];


    // Total queues generated today
     // Calculate statistics
    const totalQueues = queue.length;

    const waitingQueues = queue.filter(
      (queu) => queu.status === "waiting").length;

    // In consultation
    const consultationQueues = queue.filter((queu) => queu.status === "in-consultation").length;

    const completedQueues = queue.filter((queu) => queu.status === "completed").length;

    const cancelledQueues = queue.filter((queu) => queu.status === "cancelled").length;


    // Last queue generated today
   // Get highest queue number
    const lastQueue = queue.reduce(
      (highest, queu) => {

        if (Number(queu.queueNumber) >
          Number(highest)) {
          return queu.queueNumber;
        } return highest},0)
    return res.status(200).json({
      success: true,


      stats: {
        totalQueues,
        waitingQueues,
        consultationQueues,
        completedQueues,
        cancelledQueues,
        lastQueueNumber: lastQueue}});


} catch (error) {
    console.log(
      "QUEUE STATS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export {generateQueue, getDoctorQueue, getUserQueue, attendPatient,  completePatient, adminGetQueueStats}