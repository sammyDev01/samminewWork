import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/DoctorsModel.js'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/UserModel.js'
// adding Doctor

const addDoctor = async (req,res)=>{

    try {
        
        const  {name, email, password, speciality, degree, experience, about, address} = req.body

        const imageFile = req.file
        console.log({name, email, password, speciality, degree, experience, about, address})
        // checking all data to add Doctor
        if(!name || !email || !password || !speciality || !degree || !experience|| !about || !address){
            return res.json({success: false, message:"Missing Details"})
            console.log({name, email, password, speciality, degree, experience, about, address})

        }
        //  validating package

        if(!validator.isEmail(email)){
             return res.json({success: false, message:"please Enter a valid email"})
        }

        // validating a strong passwor

        if(password.length < 8){
             return res.json({success: false, message:"please Enter a strong password"})
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        const imageURL =imageUpload.secure_url

        const doctorData ={
            name, 
            email,
            image: imageURL,
            password: hashPassword,
            speciality,
            degree, 
            experience,
            about,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save()

        res.json({success:true, message:'doctor Added'})


    } catch (error) {
        console.log("error connection", error)
        res.json({success:false,message:error.message})
    }

}

// API FOR ADMIN LOGIN
const adminLogin = async (req,res)=>{
    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            return res.json({success:true, message:"Admin Login Successful", token})
        }else{
            return res.json({success:false, message:"Invalid Admin Credentials"})
        }
} catch (error) {
    console.log("error connection", error)
    res.json({success:false,message:error.message})

}

} 

// API to all doctors list for admin pannel

const allDoctors = async (req, res) =>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success: true, doctors})
        
    } catch (error) {
    console.log("error connection", error)
    res.json({success:false,message:error.message})
    }

}

// API for appointment page
const appointmentAdmin = async(req, res)=>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})
    } catch (error) {
          console.log("error connection", error)
    res.json({success:false,message:error.message})
    }
}

// Api for Appointment cancelled

const  appointmentCancelled = async (req, res) =>{
      try {
        const  { appointmentId} = req.body

        
        const appointmentData = await appointmentModel.findById(appointmentId)

        if(!appointmentData){
             return res.json({success: false, meaasge: "appointment not found"})
        }

        // verify appointmeent user

        

        if(appointmentData.isCompleted){
             return res.json({success: false, meaasge: "appointment completed can not be cancelled"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
        

        // releassing doctor slot
        const {doctorId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(doctorId)

        let slotsBooked = doctorData.slotsBooked
        slotsBooked[slotDate]= slotsBooked[slotDate].filter(e => e !== slotTime) 

        await doctorModel.findByIdAndUpdate(doctorId, {slotsBooked})
        res.json({success: true, message: "Appointment Cancel"})

  
        
    } catch (error) {
        console.log("error connection", error);
        res.json({ success: false, message: error.message }); 
    }

}

// Api for Admin DashBoard
const adminDashBoard = async(req, res)=>{
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointment = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointment: appointment.length,
            patient: users.length,
            latestAppointment: appointment.reverse().slice(0,5)
        }


        res.json({success:true, dashData})
    } catch (error) {
        console.log("error connection", error);
        res.json({ success: false, message: error.message }); 
    }
}



export {addDoctor, adminLogin, allDoctors, appointmentAdmin, appointmentCancelled , adminDashBoard} 