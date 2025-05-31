import express from "express";
import { isAuth, isEmployer } from "../middlewares/authMiddleware.js";
import {
  applyJob,
  getApplicantsForEmployer,
  getMyJobs,
  updateApplicationStatus
} from "../controllers/applicationController.js";

const router = express.Router();

// Applicant Routes (require isAuth)
router.post("/apply-job/:job_id", isAuth, applyJob);
router.get("/applied-jobs", isAuth, getMyJobs);

// Employer Routes (require isEmployer)
router.get("/my-applicants", isEmployer, getApplicantsForEmployer);
router.post("/update-status/:application_id", isEmployer, updateApplicationStatus);

export default router;
