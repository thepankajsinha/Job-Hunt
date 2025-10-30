import express from "express";
import { isAuth, isEmployer } from "../middlewares/authMiddleware.js";
import {
  applyJob,
  getAllApplicants,
  getAppliedJobs,
  updateStatus
} from "../controllers/applicationController.js";

const router = express.Router();

// Applicant Routes (require isAuth)
router.post("/apply-job/:job_id", isAuth, applyJob);
router.get("/applied-jobs", isAuth, getAppliedJobs);

// Employer Routes (require isEmployer)
router.get("/applicants", isEmployer, getAllApplicants);
router.post("/update-status/:application_id", isEmployer, updateStatus);

export default router;
