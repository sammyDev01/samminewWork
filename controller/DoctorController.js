import doctorModel from "../models/DoctorsModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import appointmentModel from "../models/appointmentModel.js";
import QueueModel from "../models/QueueModel.js";

const changeAvailability = async (req, res) => {
    try {
        const { doctorId } = req.body; 
        
        const docData = await doctorModel.findById(doctorId);
        await doctorModel.findByIdAndUpdate(doctorId, { available: !docData.available });
        res.json({success:true, message:'Availability Updated'});

    } catch (error) {
        console.log("error connection", error)
        res.json({success:false, message:error.message})
    }
}

const DoctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password -email");

        res.json({success:true, message:'Doctors List Fetched', doctors});
    } catch (error) {
        console.log("error connection", error)
        res.json({success:false, message:error.message})
    }  
    
    
}

// Api for doctor login

const doctorLogin = async (req, res)=>{
    try {
        const  {email, password} = req.body

        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            res.json({success: false, message:"invalid credentials"})

        }
        const isMatch = await bcrypt.compare(password, doctor.password)

        if(isMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)

            res.json({success:true, token})
        }else{
            res.json({success:true, message:'invalid credentials'})
        }
        
    } catch (error) {
        console.log("error connection", error)
        res.json({success:false, message:error.message})
    }
}

// Api for doctor Appointment pannel

const appointentForDoctor = async (req, res)=>{
    try {
        const  doctorId = req.doctorId.id
        const appointments = await appointmentModel.find({doctorId});
         res.json({success: true, appointments})  
    } catch (error) {
        console.log("error connection", error)
        res.json({success:false, message:error.message})
    }
}



// Api to marrk appointment complete
const appointmentComplete = async(req, res)=>{
    try {
        const {appointmentId} = req.body
        const doctorId = req.doctorId.id 
        const appointmentsData = await appointmentModel.findById(appointmentId)

        if(!appointmentsData){
             return res.json({success: false, meaasge: "appointment not found"})
        }

        if(appointmentsData && appointmentsData.doctorId.toString() === doctorId.toString()){
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true})
            return res.json({success:true, message:"Appointent completed"})
        } else {
             return res.json({success:false, message:"mark failed"})
        }
        
    } catch (error) {
        console.log("error connection", error)
        res.json({success:false, message:error.message})
    }
}


// Api to cancelled appointment 
const appointmentCancel = async(req, res)=>{
    try {
        const {appointmentId} = req.body
        const doctorId = req.doctorId.id
        const appointmentsData = await appointmentModel.findById(appointmentId)

        if(appointmentsData && appointmentsData.doctorId.toString() === doctorId.toString()){
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
            return res.json({success:true, message:"Appointent is cancelled"})
        } else {
             return res.json({success:false, message:"cancelled failed"})
        }
        
    } catch (error) {
        console.log("error connection", error)
        res.json({success:false, message:error.message})
    }
}
// Api to get dashboard for doctor
const doctorDashBoard = async(req,res)=>{
    try {
            const doctorId = req.doctorId.id
            const queueId = req.body

            const queue = await QueueModel.find({queueId})
            const appointments = await appointmentModel.find({doctorId})

            const lent = queue.length
            console.log("see your length", lent);
            
            
            let  patients = []

            appointments.map((item)=>{
                if(!patients.includes(item.userId)){
                    patients.push(item.userId)
                }
            })

            const dashData ={
                appointments:  appointments.length,
                patients: patients.length,
                latestAppointments: appointments.reverse().slice(0,5),
                QueueNumber: queue.length
            }
        res.json({success: true, dashData })
    } catch (error) {
         console.log("error connection", error)
        res.json({success:false, message:error.message})
    }
}

//  Api  to get doctor profile
const doctorProfile = async(req, res) =>{

    try {
        const doctorId = req.doctorId.id
        const profileData = await doctorModel.findById(doctorId).select('-password')

        res.json({success: true, profileData})

    } catch (error) {
         console.log("error connection", error)
        res.json({success:false, message:error.message})
    }
}


//  Api  to update doctor profile
const updateDoctorProfile = async(req, res) =>{

    try {
        const { address, available, name} = req.body
        const doctorId = req.doctorId.id
        await doctorModel.findByIdAndUpdate(doctorId,{address, available, name}).select('-password')

        res.json({success: true, message:"profile Updated"})

    } catch (error) {
         console.log("error connection", error)
        res.json({success:false, message:error.message})
    }
}
export {changeAvailability, DoctorList, doctorLogin, appointentForDoctor,  appointmentComplete, appointmentCancel, doctorDashBoard, updateDoctorProfile, doctorProfile}