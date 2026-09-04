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


dotenv.config()






const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173",
            "http://localhost:5174",
    ],
    methods: ["GET", "POST"]
  }
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

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

// api end point
app.use('/api/admin', adminRouter)
// localhost:4000/api/admin/add-doctor

app.use('/api/doctor', doctorRouter)
// localhost:4000/api/doctor/list

app.use('/api/user', userRouter)
// localhost:4000/api/user/register

app.use('/api/queue', QueueRouter)
// localhost:4000/api/user/register

app.use("/api/consultation", consultationRouter);
// localhost:4000/api/consultationRouter/register


app.get('/',(req,res) =>{
    res.send('API WORKING')
})

// server.listen(4000, () => {
//   console.log("Server running on port 4000");
// });
// app
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on PORT ${PORT}`);
});
// server.listen(port, ()=> console.log('server started', port))