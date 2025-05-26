import express from "express";

import { isAuth, isEmployer} from "../middlewares/authMiddleware.js";
import { applyJob, getApplicantsForEmployer, getMyJobs, updateApplicationStatus} from "../controllers/applicationController.js";

const router = express.Router();

//for job seeker

router.get("/my-jobs", isAuth, getMyJobs);
router.post("/:job_id", isAuth, applyJob);

//for employer
router.post("/update-status/:application_id", isEmployer, updateApplicationStatus);
router.get("/my-applications", isEmployer, getApplicantsForEmployer);

export default router;