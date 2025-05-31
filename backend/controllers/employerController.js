import dotenv from "dotenv";
import { sql } from "../lib/db.js";
dotenv.config();

//get current employer
export const getEmployer = async (req, res) => {
  const userId = req.userId;

  try {
    // Fetch the current employer's details from the database
    const result = await sql`
      SELECT * FROM employers
      WHERE user_id = ${userId}
    `;

    const employer = result.rows[0];

    // Check if the employer exists
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Employer not found" });
    }
    
    // Return the employer's details
    res.status(200).json({
      message: "Current employer fetched successfully",
      employer
    });
  } catch (error) {
    console.error("Error fetching current employer:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update employer profile
export const updateEmployer = async (req, res) => {
  const userId = req.userId;

  const {name, description, website_url, logo_url, industry } = req.body;

  try {
    // Update the employer's profile in the database
    const result = await sql`
      UPDATE employers
      SET name = ${name},
          description = ${description},
          website_url = ${website_url},
          logo_url = ${logo_url},
          industry = ${industry}
      WHERE user_id = ${userId}
      RETURNING *
    `;

    // Check if the update was successful
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Employer not found" });
    }

    // Return the updated employer's details
    res.status(200).json({
      message: "Employer profile updated successfully",
      employer: result.rows[0]
    });
  } catch (error) {
    console.error("Error updating employer profile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};