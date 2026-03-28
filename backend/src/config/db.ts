import mongoose from "mongoose";

export function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI || "";

  return mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(1);
    });
}
