import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import 'dotenv/config'
import connetDB from './config/mongoDB.js'
import adminRouter from './Routes/adminRoute.js';
import connectCloudinary from './config/cloudnary.js';
import doctorRouter from './Routes/doctorRoute.js';
import userRouter from './Routes/userRoute.js';
import QueueRouter from './Routes/QueueRoute.js';
import consultationRouter from "./Routes/ConsultationRoute.js";
import http from 'http'
import {Server} from 'socket.io'
import bcrypt from 'bcrypt'
import Admin from './models/adminModel.js'


dotenv.config()
const app = express()
const server = http.createServer(app)
const allowedOrigins = [
  "https://new-wdu-healthsystemb.netlify.app",
  "https://new-wdu-adminsite-healthsysystem.netlify.app",
  "http://localhost:3000",
  "http://localhost:5174"
];
// app.post('/api/create-admin', async (req, res) =>{
//   try {
//     const { email, password } = req.body; 
//     const exist = await Admin.findOne({ email });

//     if (exist) {
//       return res.status(400).json({ message: 'Admin with this email already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newAdmin = new Admin({ email, password: hashedPassword , role: 'admin' });

//     await newAdmin.save();

//     res.status(201).json({ message: 'Admin created successfully' });
//   } catch (error) {
//     console.error('Error creating admin:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

app.use(cors({
  origin: allowedOrigins,
  //  origin: "http://localhost:5174",
  //  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// middleware

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    // origin:  "http://localhost:5174",
    // origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST"]
  },
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-consultation", (appointmentId) => {
    socket.join(appointmentId);

     console.log(`Socket ${socket.id} joined consultation ${appointmentId}`);

      socket.to(appointmentId).emit("user-joined", {
      socketId: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
})


const PORT = process.env.PORT || 4000

connetDB()
connectCloudinary()



// app.use(cors())

// api end point
app.use('/api/admin', adminRouter)
// localhost:4000/api/admin/add-doctor

app.use('/api/doctor', doctorRouter)
// localhost:4000/api/doctor/list

app.use('/api/user', userRouter)
// localhost:4000/api/user/register

app.use('/api/queue', QueueRouter)
// localhost:4000/api/queue/list

app.use("/api/consultation", consultationRouter);
// localhost:4000/api/consultationRouter/register


app.get('/',(req,res) =>{
    res.send('API WORKING')
})

server.listen( PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// app
// server.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server running on PORT ${PORT}`);
// });
// server.listen(port, ()=> console.log('server started', port))