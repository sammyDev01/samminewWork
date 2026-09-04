import { io } from "socket.io-client";

const socket = io("https://healthcare-for-wdu-netlify-3.onrender.com");

socket.on("connect", () => {
  console.log("Patient connected:", socket.id);
});

export default socket;