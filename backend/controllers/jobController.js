import { sql } from "./lib/db.js";

//create job
export const createJob = async (req, res) => {
  try {
    
    const user_id = req.userId;

    //find employer_id using user_id
    const employer = await sql`SELECT employer_id FROM employers WHERE user_id = ${user_id}`;
    if (employer.length === 0) {
      return res.status(404).json({
        message: "Employer not found",
      });
    }

    const employer_id = employer[0].employer_id;

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
    });
  }
}

//update job
export const updateJob = async (req, res) => {

  try {
    const user_id = req.userId;
    const job_id = req.params.job_id;

    //find employer_id using user_id
    const employer =
      await sql`SELECT employer_id FROM employers WHERE user_id = ${user_id}`;
      if (employer.length === 0) {
        return res.status(404).json({
          message: "Employer not found",
        });
    }

    const employer_id = employer[0].employer_id;

    const { job_title, job_description, location, salary_range, job_type } = req.body;

    // Validate request body
    if (!job_title || !job_description || !location || !salary_range || !job_type) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Update job
    const result = await sql`
      UPDATE jobs
      SET job_title = ${job_title},
          job_description = ${job_description},
          location = ${location},
          salary_range = ${salary_range},
          job_type = ${job_type}
      WHERE job_id = ${job_id} AND employer_id = ${employer_id}`;

    if (result.count === 0) {
      return res
        .status(404)
        .json({ message: "Job not found or you're not authorized" });
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
}

//delete job
export const deleteJob = async (req, res) => {

  try {
    const user_id = req.userId;
    const job_id = req.params.job_id;

    // Find employer_id using user_id
    const employer = await sql`SELECT employer_id FROM employers WHERE user_id = ${user_id}`;
    if (employer.length === 0) {
      return res.status(404).json({
        message: "Employer not found",
      });
    }
    const employer_id = employer[0].employer_id;

    // Delete job and get result
    const result = await sql`
      DELETE FROM jobs
      WHERE job_id = ${job_id} AND employer_id = ${employer_id}
    `;

    // Check if any row was deleted
    if (result.count === 0) {
      return res.status(404).json({
        message: "Job not found or you're not authorized to delete it",
      });
    }

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


//get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await sql`
      SELECT 
        jobs.job_id, jobs.job_title, jobs.job_description, jobs.location, 
        jobs.salary_range, jobs.job_type, jobs.employer_id,
        employers.company_logo
      FROM jobs
      JOIN employers ON jobs.employer_id = employers.employer_id
    `;

    res.status(200).json({
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    console.error("Error in getAllJobs:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

//get job by id
export const getJobById = async (req, res) => {
  const job_id = req.params.job_id;

  try {
    const job = await sql`
      SELECT 
        jobs.job_id, jobs.job_title, jobs.job_description, jobs.location, 
        jobs.salary_range, jobs.job_type, jobs.employer_id,
        employers.company_logo
      FROM jobs
      JOIN employers ON jobs.employer_id = employers.employer_id
      WHERE jobs.job_id = ${job_id}
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
    console.error("Error in getJobById:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};