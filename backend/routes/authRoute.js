import express from "express";
import { login, logout,registerApplicant, registerEmployer } from "../controllers/authController.js";

const router = express.Router();

router.post("/register/applicant", registerApplicant);
router.post("/register/employer", registerEmployer);
router.post("/login", login);
router.post("/logout", logout);

export default router;
