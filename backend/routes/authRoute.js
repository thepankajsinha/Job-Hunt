import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protectRoute, getProfile);

export default router;
