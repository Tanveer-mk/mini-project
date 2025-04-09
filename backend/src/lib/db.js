import mongoose from "mongoose";

export const connectDB = async function () {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDD connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};
