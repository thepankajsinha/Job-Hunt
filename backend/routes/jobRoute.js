import express from "express";
import { isEmployer } from "../middlewares/authMiddleware.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getEmployerJobs,
  getJobById,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Public Routes (No authentication required)
router.get("/all-jobs", getAllJobs); // List all jobs (for job seekers)
router.get("/:job_id", getJobById); // Get a single job by ID


// 🔒 Protected Routes (Employer Only)
router.get("/my-jobs", isEmployer, getEmployerJobs); // Get employer's own jobs
router.post("/create-job", isEmployer, createJob); // Create a new job
router.put("/update-job/:job_id", isEmployer, updateJob); // Update a job
router.delete("/delete-job/:job_id", isEmployer, deleteJob); // Delete a job

export default router;
