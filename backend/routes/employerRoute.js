import express from "express";

import { isEmployer } from "../middlewares/authMiddleware.js";
import { createEmployer, getEmployer, updateEmployer } from "../controllers/employerController.js";

const router = express.Router();

router.get("/me", isEmployer, getEmployer);
router.post("/create", isEmployer, createEmployer);
router.put("/update",isEmployer, updateEmployer);

export default router;
