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

    const applicant = result.rows[0];

    // Check if the applicant exists
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Applicant not found" });
    }
    // Return the applicant's details
    res.status(200).json({
      message: "Current applicant fetched successfully",
      applicant
    });
  } catch (error) {
    console.error("Error fetching current applicant:", error.message);
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
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    // Return the updated applicant's details
    res.status(200).json({
      message: "Applicant profile updated successfully",
      applicant: result.rows[0]
    });
  } catch (error) {
    console.error("Error updating applicant profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};