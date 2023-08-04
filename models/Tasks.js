import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Todo", "In Progress", "Completed"],
    default: "Todo",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("tasks", taskSchema);
