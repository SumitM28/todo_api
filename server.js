import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import cors from "cors";
import bodyParser from "body-parser";

// routers import
import authRoute from "./routes/authRoute.js";
import taskRoute from "./routes/taskRoute.js";

// configure env
dotenv.config();

// initialize PORT
const PORT = process.env.PORT || 4500;

// initialize app
const app = express();

// mongodb connection
connectDB();

// middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

// entry point
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "API Testing",
  });
});

// error handling using middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "!Something went wrong!";

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, async () => {
  console.log("server listening on port " + PORT);
});
