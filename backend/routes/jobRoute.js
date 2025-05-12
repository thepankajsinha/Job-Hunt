import express from "express";
import { createJob } from "../controllers/jobController.js";
import {protectRoute, employerRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new job

// Only accessible to employers
router.post("/create", protectRoute, employerRole, createJob);

export default router;