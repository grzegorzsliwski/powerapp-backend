import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "powerapp",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
