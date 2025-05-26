import express from "express";

import { isEmployer } from "../middlewares/authMiddleware.js";
import { createEmployer, getEmployer, updateEmployer } from "../controllers/employerController.js";

const router = express.Router();

router.post("/", isEmployer, createEmployer);
router.get("/me", isEmployer, getEmployer);
router.put("/me",isEmployer, updateEmployer);

export default router;
