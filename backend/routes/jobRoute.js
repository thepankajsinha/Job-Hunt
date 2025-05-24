import express from "express";

import { isEmployer } from "../middlewares/authMiddleware.js";
import { createJob, deleteJob, getAllJobs, getJobById, updateJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/create", isEmployer, createJob);
router.put("/update/:job_id", isEmployer, updateJob);
router.delete("/delete/:job_id", isEmployer, deleteJob);


router.get("/all-jobs", getAllJobs);
router.get("/:job_id", getJobById);

export default router;
