import express from "express";

import { isAuth, isEmployer} from "../middlewares/authMiddleware.js";
import { applyJob, getApplicantsForEmployer, getMyJobs, updateApplicationStatus} from "../controllers/applicationController.js";

const router = express.Router();

//for job seeker
router.get("/applied-jobs", isAuth, getMyJobs);
router.post("/apply-job/:job_id", isAuth, applyJob);


//for employer
router.post("/update-status/:application_id", isEmployer, updateApplicationStatus);
router.get("/my-applicants", isEmployer, getApplicantsForEmployer);

export default router;