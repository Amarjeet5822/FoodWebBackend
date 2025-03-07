import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config()

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("db Connected with Atlas");
  } catch (error) {
    
  }
};

