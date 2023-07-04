import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

const router = Router();

// register
router.post("/register", registerController);

// login
router.post("/login", loginController);

export default router;
