import jwt from "jsonwebtoken";
import 'dotenv/config'
// admin authentication middleware
const authAdmin = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
// console.log(req.headers);
// console.log(req.headers.token);

  try {
        
        const aToken = req.headers.authorization?.split(" ")[1];
        console.log(aToken)
        if(!aToken){
            return res.json({success:false, message:"Token not found"})
        }
        const decoded_token = jwt.verify(aToken, process.env.JWT_SECRET)
        if(!decoded_token.id){
            return res.json({success:false, message:"Invalid Token"})
        }
        req.adminId = decoded_token.id;
        // if(decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        //     return res.json({success:false, message:"Invalid Token"})
        // }
        next()
  } catch (error) {
        console.log("error connection", error)
    return res.json({ success: false, message: "Invalid Token" });
  }
};

export default authAdmin;