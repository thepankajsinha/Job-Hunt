import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getApplicant, updateApplicant } from "../controllers/applicantController.js";

const router = express.Router();

router.get("/profile", isAuth, getApplicant);
router.put("/update-profile", isAuth, updateApplicant);

export default router;
