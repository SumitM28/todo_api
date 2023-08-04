import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import taskRoute from "./routes/taskRoute.js";
const PORT = process.env.PORT || 4500;
// setting up .env file
dotenv.config();

// connection with database (MongoDB).
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("database disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("database connected!");
});

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/auth", authRoute);
app.use("/tasks", taskRoute);

// error handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    status: errorStatus,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`server listening on ${PORT}`);
});
