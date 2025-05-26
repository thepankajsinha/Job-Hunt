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
router.get("/all-jobs", getAllJobs);
router.get("/:job_id", getJobById);

// Protected employer routes
router.get("/my-jobs", isEmployer, getMyJobs);
router.post("/create-job", isEmployer, createJob);
router.put("/update-job/:job_id", isEmployer, updateJob);
router.delete("/delete-job/:job_id", isEmployer, deleteJob);

export default router;
