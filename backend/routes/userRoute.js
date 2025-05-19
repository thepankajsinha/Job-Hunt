import express from "express";
import {
  deleteProfile,
  getProfile,
  login,
  logout,
  register,
  updateProfile
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", isAuth, getProfile);
router.put("/profile", isAuth, updateProfile);
router.delete("/profile", isAuth, deleteProfile);

export default router;
