import { sql } from "../lib/db.js";

//job seeker application controller
export const applyJob = async (req, res) => {
    const user_id = req.userId;
    const role = req.role;

    const job_id = req.params.job_id;
  
    if (role !== "job_seeker") {
      return res.status(403).json({ message: "Access denied. Job seeker only." });
    }
  
    try {

      //get ressume_url form applicant table
      const result = await sql`
        SELECT resume_url,applicant_id
        FROM applicants
        WHERE user_id = ${user_id}
      `;

      if (result.length === 0) {
        return res.status(400).json({ message: "You are not registered as an applicant" }); 
      }

      const resume_url = result[0].resume_url;
      const applicant_id = result[0].applicant_id;

      if (!resume_url) {
        return res.status(400).json({ message: "Add resume in my profile section" });
      }

      //check if the user has already applied for the job
      const existingApplication = await sql`
        SELECT application_id
        FROM applications
        WHERE applicant_id = ${applicant_id} AND job_id = ${job_id}
      `;

      if (existingApplication.length > 0) {
        return res.status(400).json({ message: "You have already applied for this job" });
      }

      //create application
      const newApplication = await sql`
        INSERT INTO applications (job_id,applicant_id, resume_url)
        VALUES (${job_id}, ${applicant_id}, ${resume_url})
      `;

      res.status(201).json({
        message: "Job applied successfully",
      });
    } catch (error) {
      console.error("Error in applyJob controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};

export const getAppliedJobs = async (req, res) => {
    const user_id = req.userId;
    const role = req.role;
  
    if (role !== "job_seeker") {
      return res.status(403).json({ message: "Access denied. Job seeker only." });
    }
  
    try {
      //find applicant_id from applicants table using user_id
      const applicant = await sql`
        SELECT applicant_id
        FROM applicants
        WHERE user_id = ${user_id}
      `;

      if (applicant.length === 0) {
        return res.status(400).json({ message: "You are not registered as an applicant" });
      }

      const applicant_id = applicant[0].applicant_id;

      const applications = await sql`
        SELECT 
          j.*, 
          e.name,
          e.logo_url,
          a.application_id, 
          a.status, 
          a.applied_at
        FROM applications a
        JOIN jobs j ON a.job_id = j.job_id
        JOIN employers e ON j.employer_id = e.employer_id
        WHERE a.applicant_id = ${applicant_id}
        ORDER BY a.applied_at DESC
      `;


  

      if (applications.length === 0) {
        return res.status(404).json({ message: "No applications found" });
      }
  
      res.status(200).json({ data: applications });
    } catch (error) {
      console.error("Error fetching getAppliedJobs controller", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
  


//employer application controller
export const updateStatus = async (req, res) => {

    const employer_id = req.employerId;

    const role = req.role;
    const application_id = req.params.application_id;
  
    if (role !== "employer") {
      return res.status(403).json({ message: "Access denied. Employers only." });
    }
  
    try {
      const { status } = req.body;
  
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
  
      // Check if the application exists and belongs to the employer
      const application = await sql`
        SELECT a.application_id
        FROM applications a
        JOIN jobs j ON a.job_id = j.job_id
        WHERE a.application_id = ${application_id} AND j.employer_id = ${employer_id}
      `;

      if (application.length === 0) {
        return res.status(404).json({ message: "Application not found or you do not have permission to update it" });
      }

      // Update the application status
      await sql`
        UPDATE applications
        SET status = ${status}
        WHERE application_id = ${application_id}
      `;

      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Error in updateApplicationStatus controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};


export const getAllApplicants = async (req, res) => {
  try {
    const employerId = req.employerId;

    const result = await sql`
      SELECT 
        a.status,
        a.resume_url,

        j.job_title,

        ap.first_name,
        ap.last_name,
        ap.profile_summary,
        ap.skills,

        u.email

      FROM applications a
      JOIN jobs j ON a.job_id = j.job_id
      JOIN applicants ap ON a.applicant_id = ap.applicant_id
      JOIN users u ON ap.user_id = u.user_id

      WHERE j.employer_id = ${employerId}
      ORDER BY a.applied_at DESC;
    `;

    res.status(200).json({
      message: "Applicants fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in getAllApplicants controller:", error.message);
    res.status(500).json({
      message: "Failed to fetch applicants",
      error: error.message,
    });
  }
};
  
  