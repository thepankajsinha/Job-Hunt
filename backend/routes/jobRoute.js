import express from "express";
import { isEmployer } from "../middlewares/authMiddleware.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Public routes
router.get("/", getAllJobs);
router.get("/:job_id", getJobById);

// Protected employer routes
router.get("/me", isEmployer, getMyJobs);
router.post("/", isEmployer, createJob);
router.put("/:job_id", isEmployer, updateJob);
router.delete("/:job_id", isEmployer, deleteJob);

export default router;
