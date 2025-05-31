import dotenv from "dotenv";
import { sql } from "../lib/db.js";
dotenv.config();

// Bookmark a job
export const bookmarkJob = async (req, res) => {
    const userId = req.userId;
    const role = req.role;

    if (role !== "job_seeker") {
        return res.status(403).json({ message: "Access denied. Job seeker only." });
    }
  try {
    //find the applicant_id from the user_id
    const applicantResult = await sql`
      SELECT applicant_id FROM applicants
      WHERE user_id = ${userId}
    `;

    if (applicantResult.length === 0) {
      return res.status(400).json({ message: "You are not registered as an applicant" });
    }
    const applicant_id = applicantResult[0].applicant_id;

    const { job_id } = req.body;

    // Try to insert the bookmark (ignore if it already exists)
    const result = await sql`
      INSERT INTO bookmarks (applicant_id, job_id)
      VALUES (${applicant_id}, ${job_id})
      ON CONFLICT (applicant_id, job_id) DO NOTHING
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(409).json({ message: "Bookmark already exists" });
    }

    res.status(201).json({
      message: "Job bookmarked successfully",
      bookmark: result[0],
    });
  } catch (error) {
    console.error("Error in bookmarkJob controller:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all bookmarked jobs for the current applicant
export const getBookmarkedJobs = async (req, res) => {
    const userId = req.userId;
    const role = req.role;

    if (role !== "job_seeker") {
        return res.status(403).json({ message: "Access denied. Job seeker only." });
    }
  try {
    // Find the applicant_id from the user_id
    const applicantResult = await sql`
      SELECT applicant_id FROM applicants
      WHERE user_id = ${userId}
    `;

    if (applicantResult.length === 0) {
      return res.status(400).json({ message: "You are not registered as an applicant" });
    }
    const applicant_id = applicantResult[0].applicant_id;

    // Fetch all bookmarked jobs for the applicant
    const result = await sql`
      SELECT b.bookmark_id, b.job_id, j.title, j.company_name, j.location, j.salary
      FROM bookmarks b
      JOIN jobs j ON b.job_id = j.job_id
      WHERE b.applicant_id = ${applicant_id}
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "No bookmarked jobs found" });
    }

    res.status(200).json({
      message: "Bookmarked jobs fetched successfully",
      bookmarks: result,
    });
  } catch (error) {
    console.error("Error in getBookmarkedJobs controller:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Remove a job from bookmarks
export const removeBookmark = async (req, res) => {
    const userId = req.userId;
    const role = req.role;

    if (role !== "job_seeker") {
        return res.status(403).json({ message: "Access denied. Job seeker only." });
    }
  try {
    // Find the applicant_id from the user_id
    const applicantResult = await sql`
      SELECT applicant_id FROM applicants
      WHERE user_id = ${userId}
    `;

    if (applicantResult.length === 0) {
      return res.status(400).json({ message: "You are not registered as an applicant" });
    }
    const applicant_id = applicantResult[0].applicant_id;

    const { job_id } = req.body;

    // Delete the bookmark
    const result = await sql`
      DELETE FROM bookmarks
      WHERE applicant_id = ${applicant_id} AND job_id = ${job_id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.status(200).json({
      message: "Bookmark removed successfully",
      bookmark: result[0],
    });
  } catch (error) {
    console.error("Error in removeBookmark controller:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
