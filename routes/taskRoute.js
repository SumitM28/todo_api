import { Router } from "express";
import {
  createTask,
  updateTask,
  deteteTask,
  getTask,
  getTasks,
} from "../controllers/taskController.js";
const router = Router();

// for create the tasks
router.post("/create/:userId", createTask);

// for update the tasks
router.put("/update/:userId", updateTask);

// for detete the tasks
router.delete("/delete/:_id", deteteTask);

// for geting the tasks by user
router.get("/get/:userId", getTask);

router.get("/admin/:userId", getTasks);

export default router;
