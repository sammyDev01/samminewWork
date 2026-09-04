import express from 'express'
import { registerUser, loginUser, getUserData, updateUserProfile, bookAppointment, listAppointment, cancelAppointment, completeAppointment} from '../controller/UserController.js'
import authUser from '../middleWare/authUser.js'
import upload from '../middleWare/multer.js'


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/getUserData', authUser, getUserData)
userRouter.put('/update-profile', upload.single('image'), authUser, updateUserProfile)
userRouter.post('/bookAppointmentOne', authUser, bookAppointment)
userRouter.get('/apppointment',authUser, listAppointment)
userRouter.post('/cancelMyapppointment',authUser, cancelAppointment)
userRouter.post('/completeMyAppointment',authUser, completeAppointment)



export default userRouter