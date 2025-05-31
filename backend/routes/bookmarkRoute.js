import express from "express";
import {
  bookmarkJob,
  getBookmarkedJobs,
  removeBookmark,
} from "../controllers/bookmarkController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", isAuth, getBookmarkedJobs);
router.post("/bookmark",isAuth ,bookmarkJob);
router.delete("/unbookmark",isAuth, removeBookmark);

export default router;
