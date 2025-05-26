import express from "express";
import {
  getUser,
  updateUser
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", isAuth, getUser);
router.put("/me", isAuth, updateUser);

export default router;
