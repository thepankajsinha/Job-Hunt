import express from "express";
import {
  getUser,
  updateUser
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/my-profile", isAuth, getUser);
router.put("/update-profile", isAuth, updateUser);

export default router;
