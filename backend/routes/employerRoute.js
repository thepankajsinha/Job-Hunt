import express from "express";

import { isEmployer } from "../middlewares/authMiddleware.js";
import { createEmployer, getEmployer, updateEmployer } from "../controllers/employerController.js";

const router = express.Router();

router.get("/employer-profile", isEmployer, getEmployer);
router.post("/create-employer", isEmployer, createEmployer);
router.put("/update-employer",isEmployer, updateEmployer);

export default router;
