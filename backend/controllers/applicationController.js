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
      const { resume_url } = req.body;
  
      if (!resume_url) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      await sql`
        INSERT INTO applications (user_id, job_id, resume_url)
        VALUES (${user_id}, ${job_id}, ${resume_url})
      `;
  
      res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
      console.error("Error creating application:", error);
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
          a.job_id, 
          a.resume_url, 
          a.applied_at, 
          a.updated_at, 
          a.status,
          j.job_title
        FROM applications a
        JOIN jobs j ON a.job_id = j.job_id
        WHERE a.user_id = ${user_id}
        ORDER BY a.applied_at DESC
      `;
  
      res.status(200).json({ applications });
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
  

//employer application controller
export const updateApplicationStatus = async (req, res) => {
    const user_id = req.userId;

    //find employer id from user id
    const result = await sql`
      SELECT employer_id 
      FROM employers 
      WHERE user_id = ${user_id}
    `;

    const employer_id = result[0]?.employer_id;

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
  
      const appCheck = await sql`
        SELECT applications.application_id
        FROM applications
        JOIN jobs ON applications.job_id = jobs.job_id
        WHERE applications.application_id = ${application_id}
        AND jobs.employer_id = ${employer_id}
      `;
  
      if (appCheck.length === 0) {
        return res.status(403).json({ message: "You do not have permission to update this application" });
      }
  
      await sql`
        UPDATE applications
        SET status = ${status}, updated_at = NOW()
        WHERE application_id = ${application_id}
      `;
  
      res.status(200).json({ message: "Application status updated successfully" });
    } catch (error) {
      console.error("Error updating application status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};

export const getApplicantsForEmployer = async (req, res) => {
    const user_id = req.userId;

    //find employer id from user id
    const result = await sql`
      SELECT employer_id 
      FROM employers 
      WHERE user_id = ${user_id}
    `;

    const employer_id = result[0]?.employer_id;


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
      console.error("Error fetching applicants:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
  
  