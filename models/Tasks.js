import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Completed", "Processing", "Pending"],
    },
  },
  { timestamp: true }
);

export default mongoose.model("tasks", TaskSchema);
