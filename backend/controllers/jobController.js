import { sql } from "../lib/db.js";

export const createJob = async (req, res) => {
  try {
    const employer_id = req.employerId;

    const { job_title, job_description, job_location, salary_range, job_type } =
      req.body;

    // Create job
    const newJob = await sql`
      INSERT INTO jobs (job_title, job_description, job_location, salary_range, job_type, employer_id)
      VALUES (${job_title}, ${job_description}, ${job_location}, ${salary_range}, ${job_type}, ${employer_id})
      RETURNING *
    `;
    res.status(201).json({
      message: "Job created successfully"
    });
  } catch (error) {
    console.error("Error in createJob controller:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const updateJob = async (req, res) => {
  try {
    const employer_id = req.employerId;
    const job_id = req.params.job_id;


    const { job_title, job_description, job_location, salary_range, job_type } = req.body;

    // Update job
    const updatedJob = await sql`
      UPDATE jobs
      SET job_title = ${job_title}, job_description = ${job_description}, job_location = ${job_location}, salary_range = ${salary_range}, job_type = ${job_type}
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
    });
  } catch (error) {
    console.error("Error in updateJob controller:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

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

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await sql`
      SELECT j.*, e.name, e.logo_url
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


export const getJobById = async (req, res) => {
  try {
    const job_id = req.params.job_id;

    const job = await sql`
      SELECT j.*, e.name, e.logo_url
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
      SELECT j.*, e.name, e.logo_url
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


export const getFilteredJobs = async (req, res) => {
  try {
    const { job_type, job_location, keyword } = req.query;

    let baseQuery = sql`
      SELECT 
        jobs.*, 
        employers.name, 
        employers.logo_url 
      FROM jobs 
      JOIN employers ON jobs.employer_id = employers.employer_id
      WHERE 1=1
    `;

    if (job_type) {
      baseQuery = sql`${baseQuery} AND LOWER(jobs.job_type) = LOWER(${job_type})`;
    }

    if (job_location) {
      baseQuery = sql`${baseQuery} AND LOWER(jobs.job_location) LIKE LOWER(${`%${job_location}%`})`;
    }

    if (keyword) {
      baseQuery = sql`${baseQuery} AND LOWER(jobs.job_title) LIKE LOWER(${`%${keyword}%`})`;
    }

    baseQuery = sql`${baseQuery} ORDER BY jobs.posted_at DESC`;

    const jobs = await baseQuery;

    res.status(200).json({
      message: "Filtered jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    console.error("Error in getFilteredJobs controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

