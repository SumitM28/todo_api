import { Router } from "express";
import {
  loginUser,
  registerUser,
  userInfo,
} from "../controllers/authController.js";

const router = Router();

// register route
router.post("/register", registerUser);

// login route
router.post("/login", loginUser);

// get user info
router.get("/user-info/:userId", userInfo);
export default router;
