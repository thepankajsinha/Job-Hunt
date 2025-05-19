import express from "express";

import { isEmployer } from "../middlewares/authMiddleware.js";
import { createEmployer, getEmployer, updateEmployer } from "../controllers/employerController.js";

const router = express.Router();

router.post("/", isEmployer, createEmployer);
router.put("/",isEmployer, updateEmployer);
router.get("/", isEmployer, getEmployer);

export default router;
