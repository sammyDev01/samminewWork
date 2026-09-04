import { io } from "socket.io-client";

const socket = io("http://localhost:5173")
  
  // "http://localhost:5173");

socket.on("connect", () => {
  console.log("Patient connected:", socket.id);
});

export default socket;