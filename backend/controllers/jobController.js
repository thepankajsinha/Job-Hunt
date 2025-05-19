import { sql } from "../lib/db.js";

export const createJob = async (req, res) => {

    const employer_id = req.employerId;

  try {
    
    const { job_title, job_description, location, salary_range, job_type } = req.body;

    // Validate request body
    if (!job_title || !job_description || !location || !salary_range || !job_type) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Create new job
    await sql`INSERT INTO jobs (job_title, job_description, location, salary_range, job_type, employer_id) VALUES (${job_title}, ${job_description}, ${location}, ${salary_range}, ${job_type}, ${employer_id})`;

    res.status(201).json({
      message: "Job created successfully",
    });
  } catch (error) {
    console.error("Error in createJob:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

//update job
export const updateJob = async (req, res) => {
  const employer_id = req.employerId;
  const job_id = req.params.job_id;

  try {
    const { job_title, job_description, location, salary_range, job_type } = req.body;

    // Validate request body
    if (!job_title || !job_description || !location || !salary_range || !job_type) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Update job
    await sql`UPDATE jobs SET job_title = ${job_title}, job_description = ${job_description}, location = ${location}, salary_range = ${salary_range}, job_type = ${job_type} WHERE id = ${job_id} AND employer_id = ${employer_id}`;

    res.status(200).json({
      message: "Job updated successfully",
    });
  } catch (error) {
    console.error("Error in updateJob:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

//delete job
export const deleteJob = async (req, res) => {
  const employer_id = req.employerId;
  const job_id = req.params.job_id;

  try {
    // Delete job
    await sql`DELETE FROM jobs WHERE id = ${job_id} AND employer_id = ${employer_id}`;

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteJob:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

//get all jobs
export const getAllJobs = async (req, res) => {
  try {
    // Get all jobs
    const jobs = await sql`SELECT * FROM jobs`;

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    console.error("Error in getAllJobs:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

//get job by id
export const getJobById = async (req, res) => {
  const job_id = req.params.job_id;

  try {
    // Get job by id
    const job = await sql`SELECT * FROM jobs WHERE id = ${job_id}`;

    if (job.length === 0) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job fetched successfully",
      data: job[0],
    });
  } catch (error) {
    console.error("Error in getJobById:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}