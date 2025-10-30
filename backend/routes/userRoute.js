import express from "express";
import { currentUser, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me",isAuth,currentUser)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
