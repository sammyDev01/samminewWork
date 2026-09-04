import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref:"user", require: true
    },  
    doctorId: {
       type: mongoose.Schema.Types.ObjectId, ref:"doctor", require: true
    },
    slotDate:{
        type: String, require: true
    },
    slotTime:{  
        type: String, require: true
    },
    userData: {
        type: Object, require: true
    },  
    doctorData: {
        type: Object, require: true
    },
    date: {
        type: Date, default: Date.now
    },
    cancelled: {
        type: Boolean, default: false
    },
    isCompleted: {
        type: Boolean, default: false
    }
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointments', appointmentSchema)
export default appointmentModel