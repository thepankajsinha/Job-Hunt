import express from "express";

import { isEmployer } from "../middlewares/authMiddleware.js";
import { getEmployer, updateEmployer } from "../controllers/employerController.js";

const router = express.Router();

router.get("/profile", isEmployer, getEmployer);
router.put("/update-employer",isEmployer, updateEmployer);

export default router;
