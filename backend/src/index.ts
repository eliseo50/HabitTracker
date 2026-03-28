import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import habitRoute from "./routes/habit.js";
import authRoute from "./routes/auth.js";
import { protectedRoute } from "./middleware/protectedRoute.js";
import cookieParser from "cookie-parser";
import dns from "node:dns/promises";

dotenv.config({ path: "../.env" });

dns.setServers(["1.1.1.1"]);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.use("/api/habits", protectedRoute, habitRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
