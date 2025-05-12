import { sql } from "../lib/db.js";


//create a new job
export const createJob = async (req, res) => {
  try {
    // Validate request body
    const {
      employer_id,
      job_title,
      job_description,
      location,
      salary_range,
      job_type,
    } = req.body;

    // Check if all fields are provided
    if (
      !employer_id ||
      !job_title ||
      !job_description ||
      !location ||
      !salary_range ||
      !job_type
    ) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Create new job
    await sql`INSERT INTO jobs (employer_id, job_title, job_description, location, salary_range, job_type) VALUES (${employer_id}, ${job_title}, ${job_description}, ${location}, ${salary_range}, ${job_type}) RETURNING *`;
    
    res.status(201).json({ message: "Job created successfully" } );
  } catch (error) {
    console.log("Error in createJob", error.message);
    res.status(500).json({ message: "Error in creating job" });
  }
};