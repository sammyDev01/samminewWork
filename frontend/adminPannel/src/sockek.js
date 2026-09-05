import { io } from "socket.io-client";

const socket = io("https://samminewwork.onrender.com");

socket.on("connect", () => {
  console.log("Patient connected:", socket.id);
  
});

export default socket;