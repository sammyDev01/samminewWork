import jwt from "jsonwebtoken";
import 'dotenv/config'
import userModel from "../models/UserModel.js";

const authUser =  async (req, res, next) => {


  try {
        const authHeader = req.hearders.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({success: false, message: "Not Authorized. please login"})
        }
        const token = authHeader.split(" ")[1];
        console.log(token)
        if(!token){
            return res.json({success:false, message:"Token not found"})
        }
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded_token)
        if(!decoded_token){
            return res.json({success:false, message:"Invalid Token"})
        };
        const user = await userModel.findById(decoded_token.id)

        if (!user){
            return res.status(401).json({success: false, message:"User No Longer exists. please login again."})
        }

       req.userId = user.id; // Store the user ID in the request body for later use

        next() 
  } catch (error) {
        console.log("error connection", error)
    return res.json({ success: false, message: "Invalid Token" });
  }
};

export default authUser;