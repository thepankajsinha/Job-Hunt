import express from "express";
import { analyzeResume, matchJob } from "../controllers/resumeController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import upload from "../lib/multer.js";

const router = express.Router();

// ✅ Route 1: Resume Analysis
router.post("/analyze", isAuth, upload.single("resume"), analyzeResume);

// ✅ Route 2: Job Match 
router.post("/match-job", isAuth, upload.single("resume"), matchJob);

export default router;
