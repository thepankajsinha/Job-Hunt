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
    
    // Check if the employer exists
    if (result.length === 0) {
      return res.status(404).json({ message: "Employer not found" });
    }
    
    const employer = result[0];

    res.status(200).json({
      message: "Current employer fetched successfully",
      data: employer
    });
  } catch (error) {
    console.error("Error in getEmployer controller:", error.message);
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
    if (result.length === 0) {
      return res.status(404).json({ message: "Employer not found" });
    }

    // Return the updated employer's details
    res.status(201).json({
      message: "Employer profile updated successfully",
    });
  } catch (error) {
    console.error("Error in update employer controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};