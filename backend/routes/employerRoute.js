import express from "express";

import { isEmployer } from "../middlewares/authMiddleware.js";
import { createEmployer, updateEmployer } from "../controllers/employerController.js";

const router = express.Router();

router.post("/", isEmployer, createEmployer);
router.put("/:id",isEmployer, updateEmployer);

export default router;
