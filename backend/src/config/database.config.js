import mongoose from "mongoose";

let isConnected = false;
mongoose.set("strictQuery", true);

export const dbConnect = async () => {

  try {
      await mongoose.connect(process.env.MONGO_URI);
      isConnected = true;
      console.log("Database connected!");
  } catch (err) {
    console.error("Database connection failed!", err);
  }
};
