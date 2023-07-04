import { Router } from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createTaskController,
  deleteTaskController,
  filterTaskController,
  getAllTaskController,
  getSingleTaskController,
  searchTaskController,
  updateTaskController,
} from "../controllers/taskController.js";

const router = Router();

// create tasks
router.post("/create", requireSignIn, createTaskController);

// update tasks
router.put("/update/:taskId", requireSignIn, updateTaskController);

// delete tasks
router.delete("/delete/:taskId", requireSignIn, deleteTaskController);

// filter tasks based on status
router.get("/filter?", requireSignIn, filterTaskController);

// search tasks based on title or description
router.post("/search", requireSignIn, searchTaskController);

// get single task
router.get("/get-single/:taskId", requireSignIn, getSingleTaskController);

// get all tasks
router.get("/get-all", requireSignIn, getAllTaskController);
export default router;
