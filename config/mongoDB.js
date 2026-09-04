import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => { 
    
    try {
        mongoose.connection.on('connected', () => console.log("connected to dataBase"))
        await mongoose.connect(`${process.env.MONGODB_URI}/westerndelta`);
        console.log("Mongodb connect")
    } catch (error) {
        console.log(error);
        process.exit(1);
    } 
};
export default connectDB;