import express from "express";

import { isEmployer } from "../middlewares/authMiddleware.js";
import { createJob, deleteJob, getAllJobs, getJobById, updateJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", isEmployer, createJob);
router.put("/:job_id", isEmployer, updateJob);
router.delete("/:job_id", isEmployer, deleteJob);
router.get("/", isEmployer, getAllJobs);
router.get("/:job_id", isEmployer, getJobById); // Assuming you want to get a job by ID

export default router;
