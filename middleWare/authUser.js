import jwt from "jsonwebtoken";
import 'dotenv/config'
const authUser = (req, res, next) => {


  try {
        
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token)
        if(!token){
            return res.json({success:false, message:"Token not found"})
        }
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded_token)
        if(!decoded_token){
            return res.json({success:false, message:"Invalid Token"})
        }

       req.userId = decoded_token.id; // Store the user ID in the request body for later use

        next() 
  } catch (error) {
        console.log("error connection", error)
    return res.json({ success: false, message: "Invalid Token" });
  }
};

export default authUser;