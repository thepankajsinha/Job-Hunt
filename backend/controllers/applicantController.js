import dotenv from "dotenv";
import { sql } from "../lib/db.js";
dotenv.config();

//get current applicant
export const getApplicant = async (req, res) => {
   const userId = req.userId;

  try {
    // Fetch the current applicant's details from the database
    const result = await sql`
      SELECT * FROM applicants
      WHERE user_id = ${userId}
    `;

    const applicant = result[0];

    // Check if the applicant exists
    if (result.length === 0) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.status(200).json({
      message: "Current applicant fetched successfully",
      data: applicant
    });
  } catch (error) {
    console.error("Error getApplicant controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update applicant profile
export const updateApplicant = async (req, res) => {
  const userId = req.userId;

  const {first_name, last_name, profile_summary,resume_url, skills} = req.body;

  try {
    // Update the applicant's profile in the database
    const result = await sql`
      UPDATE applicants
      SET first_name = ${first_name},
          last_name = ${last_name},
          profile_summary = ${profile_summary},
          resume_url = ${resume_url},
          skills = ${skills}
      WHERE user_id = ${userId}
      RETURNING *
    `;

    // Check if the update was successful
    if (result.length === 0) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.status(200).json({
      message: "Applicant profile updated successfully"
    });
  } catch (error) {
    console.error("Error in updateApplicant controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};