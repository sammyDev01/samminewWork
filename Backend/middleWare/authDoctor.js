import jwt from "jsonwebtoken";
import 'dotenv/config'
const authDoctor = (req, res, next) => {


  try {
        
        const dtoken = req.headers.authorization?.split(" ")[1];
        console.log(dtoken)
        if(!dtoken){
            return res.json({success:false, message:"Token not found"})
        }
        const decoded_token = jwt.verify(dtoken, process.env.JWT_SECRET)
        console.log(decoded_token)
        console.log("DECODED DOCTOR:", decoded_token);
        if(!decoded_token){
            return res.json({success:false, message:"Invalid Token"})
        }

       req.doctorId = decoded_token; // Store the user ID in the request body for later use

        next() 
  } catch (error) {
        console.log("error connection", error)
    return res.json({ success: false, message: "Invalid Token" });
  }
};

export default authDoctor;