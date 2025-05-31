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
        WHERE user_id = ${user_id} AND job_id = ${job_id}
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
        message: "Application created successfully",
      });
    } catch (error) {
      console.error("Error in applyJob controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};

export const getMyJobs = async (req, res) => {
    const user_id = req.userId;
    const role = req.role;
  
    if (role !== "job_seeker") {
      return res.status(403).json({ message: "Access denied. Job seeker only." });
    }
  
    try {
      const applications = await sql`
        SELECT 
          a.application_id,
          j.job_title,
          j.job_description,
          j.location,
          j.salary_range,
          a.status,
        FROM applications a
        JOIN jobs j ON a.job_id = j.job_id
        WHERE a.user_id = ${user_id}
        ORDER BY a.applied_at DESC
      `;
  
      if (applications.length === 0) {
        return res.status(404).json({ message: "No applications found" });
      }
  
      res.status(200).json({ applications });
    } catch (error) {
      console.error("Error fetching getMyJob controller", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
  

//employer application controller
export const updateApplicationStatus = async (req, res) => {

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
  
      const validStatuses = ['applied','rejected', 'hired'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
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
      res.status(200).json({ message: "Application status updated successfully" });
    } catch (error) {
      console.error("Error in updateApplicationStatus controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};


export const getApplicantsForEmployer = async (req, res) => {
    const employer_id = req.employerId;
    const role = req.role;
  
    if (role !== "employer") {
      return res.status(403).json({ message: "Access denied. Employers only." });
    }
  
    try {
      const applicants = await sql`
        SELECT 
          u.name,
          u.email,
          a.resume_url,
          j.job_title
        FROM applications a
        JOIN users u ON a.user_id = u.user_id
        JOIN jobs j ON a.job_id = j.job_id
        WHERE j.employer_id = ${employer_id}
        ORDER BY a.applied_at DESC
      `;
  
      res.status(200).json({ applicants });
    } catch (error) {
      console.error("Error in getApplicantsForEmployer controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
  
  