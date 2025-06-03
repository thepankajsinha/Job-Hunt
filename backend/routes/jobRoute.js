import express from "express";
import { isEmployer } from "../middlewares/authMiddleware.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getEmployerJobs,
  getFilteredJobs,
  getJobById,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Public Routes (No authentication required)
router.get("/all-jobs", getAllJobs); // List all jobs (for job seekers)
router.get("/filtered-jobs", getFilteredJobs);

// 🔒 Protected Routes (Employer Only)
router.get("/my-jobs", isEmployer, getEmployerJobs);
router.post("/create-job", isEmployer, createJob);
router.put("/update-job/:job_id", isEmployer, updateJob);
router.delete("/delete-job/:job_id", isEmployer, deleteJob);

// This must be LAST among similar routes
router.get("/:job_id", getJobById);

export default router;
