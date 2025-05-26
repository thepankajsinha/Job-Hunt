import { sql } from "../lib/db.js";

export const createJob = async (req, res) => {
  try {
    const user_id = req.userId;
    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await sql`
      SELECT employer_id FROM employers WHERE user_id = ${user_id}
    `;
    if (result.length === 0) {
      return res.status(404).json({ message: "Employer not found" });
    }

    const employer_id = result[0].employer_id;

    const { job_title, job_description, location, salary_range, job_type } =
      req.body;

    if (
      !job_title ||
      !job_description ||
      !location ||
      !salary_range ||
      !job_type
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const insertResult = await sql`
      INSERT INTO jobs 
        (job_title, job_description, location, salary_range, job_type, employer_id) 
      VALUES 
        (${job_title}, ${job_description}, ${location}, ${salary_range}, ${job_type}, ${employer_id})
      RETURNING job_id
    `;

    res.status(201).json({
      message: "Job created successfully",
      job_id: insertResult[0].job_id,
    });
  } catch (error) {
    console.error("Error in createJob:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const user_id = req.userId;
    const job_id = req.params.job_id;

    const result = await sql`SELECT employer_id FROM employers WHERE user_id = ${user_id}`;

    if (result.length === 0) {
      return res.status(404).json({
        message: "Employer not found",
      });
    }
    const employer = result[0];

    const employer_id = employer.employer_id;

    const { job_title, job_description, location, salary_range, job_type } =
      req.body;

    // Validate request body
    if (
      !job_title ||
      !job_description ||
      !location ||
      !salary_range ||
      !job_type
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Update job
    const updatedJob = await sql`
      UPDATE jobs
      SET job_title = ${job_title},
          job_description = ${job_description},
          location = ${location},
          salary_range = ${salary_range},
          job_type = ${job_type}
      WHERE job_id = ${job_id} AND employer_id = ${employer_id}`;

    if (updatedJob.count === 0) {
      return res.status(404).json({ message: "Job not found or you're not authorized" });
    }

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
};

export const deleteJob = async (req, res) => {
  try {
    const user_id = req.userId;
    const job_id = req.params.job_id;

    const result =
      await sql`SELECT employer_id FROM employers WHERE user_id = ${user_id}`;
    if (result.length === 0) {
      return res.status(404).json({
        message: "Employer not found",
      });
    }
    const employer = result[0];

    const employer_id = employer.employer_id;

    await sql`
      DELETE FROM jobs
      WHERE job_id = ${job_id} AND employer_id = ${employer_id}
    `;

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteJob:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await sql`
      SELECT 
        j.job_id, j.job_title, j.job_description, j.location, 
        j.salary_range, j.job_type,
        e.company_logo, e.company_name
      FROM jobs j
      JOIN employers e ON j.employer_id = e.employer_id
    `;

    res.status(200).json({
      message: "Jobs fetched successfully",
      total: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs. Please try again later.",
    });
  }
};

export const getJobById = async (req, res) => {
  const job_id = req.params.job_id;

  try {
    const result = await sql`
      SELECT 
        j.job_id, j.job_title, j.job_description, j.location, 
        j.salary_range, j.job_type,
        e.company_logo, e.company_name
      FROM jobs j
      JOIN employers e ON j.employer_id = e.employer_id
      WHERE j.job_id = ${job_id}
    `;

    if (result.length === 0) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const job = result[0];

    res.status(200).json({
      message: "Job fetched successfully",
      data: job
    });
  } catch (error) {
    console.error("Error in getJobById:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all jobs posted by the current employer
export const getMyJobs = async (req, res) => {
  try {
    const user_id = req.userId;

    const result =
      await sql`SELECT employer_id FROM employers WHERE user_id = ${user_id}`;

    if (result.length === 0) {
      return res.status(404).json({
        message: "Employer not found",
      });
    }
    const employer = result[0];

    const employer_id = employer.employer_id;

    const jobs = await sql`
      SELECT 
        job_id, job_title, job_description, location, 
        salary_range, job_type
      FROM jobs
      WHERE employer_id = ${employer_id}
      ORDER BY job_id DESC
    `;

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    console.error("Error in getJobsByCurrentEmployer:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};