import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = mongoose.connect(process.env.DB_URL);

export default connectDB;