import userModel from '../models/UserModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/DoctorsModel.js'
import appointmentModel from '../models/appointmentModel.js' 



// API to register user

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.json({success:false, message:"All fields are required"})
         }
        //  validating email and password
         if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
         }
         

        if(password.length <= 8){
            return res.json({success:false, message:"Password must be at least 8 characters long"})
        }
        // hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const existingUser = await userModel.findOne({ email});
    
        if(existingUser){
            return res.json({success:false, message:"User already exists"})
                } 
                
        const userData ={
            name,
            email,  
            password: hashPassword
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({success:true, token, message:"User registered successfully"})
    } catch (error) {
        console.log("error connection", error)
        res.json({success:false,message:error.message})
    }
}    

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;  
        const user = await userModel.findOne({ email });
        if(!user){
            return res.json({success:false, message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            // res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Set cookie for 1 hour , { expiresIn: '1h' }
            res.json({success:true, token, message:"User logged in successfully"})
        }else{
            return res.json({success:false, message:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log("error connection", error)
        res.json({success:false,message:error.message})
    }
}

const getUserData = async (req, res) => {
    try {
        const userId = req.userId; // Assuming the user ID is stored in req.user after authentication  
        const user = await userModel.findById(userId).select('-password'); // Exclude the password field from the response

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });

        console.log(user)
        
    } catch (error) {
        console.log("error connection", error);
        res.json({ success: false, message: error.message });
    }
};

// API to update user profile
const updateUserProfile = async (req, res) => {
    try {
        const  userId = req.userId; // Assuming the user ID is stored in req.user after authentication
        const { name, email, phone, image, address, gender, dob, matNum, department, level } = req.body;

        const imageFile = req.file; // Assuming the image file is sent as a multipart/form-data request
        if(!name  || !phone || !address || !gender || !dob || !matNum || !department || !level){
            return res.json({success:false, message:"All fields are required"})
         }
       

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, email, phone, image, matNum, department, level, address:JSON.parse(address), gender, dob },
        )
         if (imageFile) {
            // If an image file is provided, update the image field with the file path
            // const imagePath = await cloudinary.uploader.upload(imageFile.path,{resource_type: 'image'}); // Assuming you have a folder named 'uploads' to store images

            const result = await cloudinary.uploader.upload(imageFile.path,{resource_type: 'image', folder:'wduPicFolder'})
            updatedUser.image = result.secure_url;
           

         
            // const imageUrl = imageUploader.secure_url;
             // Get the secure URL of the uploaded image
            // await userModel.findByIdAndUpdate(userId, { image: imageUrl });
             // Update the user document with the new image URL
             await userModel.findByIdAndUpdate(userId, updatedUser)

            // res.json({ success: true, message: "Profile updated successfully", imageUrl });
            res.json({ success: true, message: "Profile updated successfully", imageUrl: result.secure_url });

        }
        // .select('-password'); // Exclude the password field from the response
        res.json({ success: true, user: updatedUser });

    } catch (error) {
        console.log("error connection", error);
        res.json({ success: false, message: error.message });
    }
};

// Api to book appointment

const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const {  doctorId, slotDate, slotTime } = req.body;
        // Assuming the user ID is stored in req.user after authentication
       
        if(!userId){
            return res.json({success:false, message:" User ID not Found"})

        }
        
          if(!doctorId || !slotDate || !slotTime){
            return res.json({success:false, message:" Missing appointment Found"})
            
        }

        const existingAppointment = await appointmentModel.findOne({doctorId, slotDate, slotTime,
            cancelled: false
        });

        if(existingAppointment){
            return res.json({success: false, message: "this appointment Slot have been book already"})
        }


        const docData = await doctorModel.findById(doctorId).select('-password'); // Exclude the password field from the response

        if(!docData){
            return res.json({success:false, message:"Doctor is not available"})
        } 

        let slotsBooked = docData.slotsBooked || {}
        
        // checking for availability of the slot
        if(slotsBooked[slotDate]){
            if(slotsBooked[slotDate].includes(slotTime)){
                return res.json({success:false, message:`This Slot ${slotTime} on ${slotDate} is already booked`})
            } else{
                slotsBooked[slotDate].push(slotTime)
            }
        } else{
            slotsBooked[slotDate] = []
            slotsBooked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password'); 

        delete docData.slotsBooked

        const appointment = new appointmentModel({
            userId,
            doctorId,
            userData,
            doctorData:docData,
            slotDate,
            slotTime,
            data: Date.now(),
            isCompleted: false,
            cancelled:false
            
        });
        
        const newAppointment = new appointmentModel(appointment);
        await newAppointment.save();
        res.json({ success: true, message: "Appointment booked successfully" });

// save new slots data in docdata
        await doctorModel.findByIdAndUpdate(doctorId, { slotsBooked });
        // docData.slotsBooked = slotsBooked;
        // await docData.save()

        res.json({ success: true, message: "Appointment booked successfully" });
    } catch (error) {
        console.log("error connection", error);
        res.json({ success: false, message: error.message });
    }
};

// API List of appointmnt


const listAppointment = async (req, res)=>{
    try {
        const userId = req.userId
        if(!userId){
            return res.json({success: false, messgae:" User Id not found"})
        }
        const appointments = await appointmentModel.find({userId}).sort({createdAt: -1})


        res.json({success: true, appointments})
    } catch (error) {
      console.log("error in appointment", error);
        res.json({ success: false, message: error.message }); 
    }

}

// 1.API Complete Appointment
const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId; // Assuming the user ID is stored in req.user after authentication
    console.log("User ID:", userId);
    console.log("Appointment ID:", appointmentId);
    if(!userId){
        return res.json({ success: false, message: "User ID not found" });
    }
    if(!appointmentId){
      return res.json({ success: false, message: "Appointment ID is required" });
    }

    const appointment = await appointmentModel.findById(appointmentId);
    console.log(appointment)
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    console.log(appointment.userId)
    if(!appointment.userId || appointment.userId.toString() !== userId.toString()){
        return res.json({success: false, message: "this appointment has no id. you are Unauthorized action"})
    }
     if(appointment.cancelled){
          return res.json({ success: false, message: "Cancelled appointment can not be completed" });
     }

    if(appointment.isCompleted){
      return res.json({ success: false, message: "Appointment is already completed" });
    }
    // Mark as completed

    appointment.isCompleted = true; 
    await appointment.save();
    // await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });


    res.json({ success: true, message: "Appointment Completed Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// api to cancel appointment
const  cancelAppointment = async (req, res) =>{
      try {
        const  { appointmentId} = req.body

        const userId = req.userId
        const appointmentData = await appointmentModel.findById(appointmentId)

        if(!appointmentData){
             return res.json({success: false, meaasge: "appointment not found"})
        }

        // verify appointmeent user

        if(!appointmentData.userId || appointmentData.userId.toString() !== userId.toString()){
            return res.json({success: false, meaasge: "unauthurized"})
        }

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

export {registerUser, loginUser, getUserData, updateUserProfile, bookAppointment, listAppointment, cancelAppointment, completeAppointment}







