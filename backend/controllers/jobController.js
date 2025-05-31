import { sql } from "../lib/db.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const employer_id = req.employerId; // Assuming employerId is set by the isEmployer middleware

    const { job_title, job_description, job_location, salary_range, job_type } =
      req.body;

    // Create job
    const newJob = await sql`
      INSERT INTO jobs (job_title, job_description, location, salary_range, job_type, employer_id)
      VALUES (${job_title}, ${job_description}, ${job_location}, ${salary_range}, ${job_type}, ${employer_id})
      RETURNING *
    `;
    res.status(201).json({
      message: "Job created successfully",
      data: newJob[0],
    });
  } catch (error) {
    console.error("Error in createJob controller:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update job details
export const updateJob = async (req, res) => {
  try {
    const employer_id = req.employerId;
    const job_id = req.params.job_id;


    const { job_title, job_description, job_location, salary_range, job_type } = req.body;

    // Update job
    const updatedJob = await sql`
      UPDATE jobs
      SET job_title = ${job_title}, job_description = ${job_description}, location = ${job_location}, salary_range = ${salary_range}, job_type = ${job_type}
      WHERE job_id = ${job_id} AND employer_id = ${employer_id}
      RETURNING *
    `;

    if (updatedJob.length === 0) {
      return res.status(404).json({
        message: "Job not found or you do not have permission to update it",
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      data: updatedJob[0],
    });
  } catch (error) {
    console.error("Error in updateJob controller:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const employer_id = req.employerId;
    const job_id = req.params.job_id;

    await sql`
      DELETE FROM jobs
      WHERE job_id = ${job_id} AND employer_id = ${employer_id}
    `;

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteJob controller:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all jobs with employer details
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await sql`
      SELECT j.*, e.employer_name, e.company_logo
      FROM jobs j
      JOIN employers e ON j.employer_id = e.employer_id
      ORDER BY j.job_id DESC
    `;

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    console.error("Error in getAllJobs controller:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get a job by its ID with employer details
export const getJobById = async (req, res) => {
  try {
    const job_id = req.params.job_id;

    const job = await sql`
      SELECT j.*, e.employer_name, e.company_logo
      FROM jobs j
      JOIN employers e ON j.employer_id = e.employer_id
      WHERE j.job_id = ${job_id}
    `;

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
    console.error("Error in getJobById controller:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all jobs posted by the current employer
export const getEmployerJobs = async (req, res) => {
  try {
    const employer_id = req.employerId;

    const jobs = await sql`
      SELECT j.*, e.employer_name, e.company_logo
      FROM jobs j
      JOIN employers e ON j.employer_id = e.employer_id
      WHERE j.employer_id = ${employer_id}
      ORDER BY j.job_id DESC
    `;

    res.status(200).json({
      message: "Employer jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    console.error("Error in getEmployerJobs controller:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};