import dotenv from "dotenv";
import { sql } from "../lib/db.js";
dotenv.config();


// Function to create a new employer
export const createEmployer = async (req, res) => {

    const user_id = req.userId;
    const role = req.userRole;

    // Check if the user is an employer
    if (role !== "employer") {
        return res.status(403).json({ message: "Access denied. Employers only." });
    }

    try {
        const { user_id, company_name, company_description, company_website, company_logo } = req.body;

        await sql`INSERT INTO employers (user_id, company_name, company_description, company_website, company_logo) VALUES (${user_id}, ${company_name}, ${company_description}, ${company_website}, ${company_logo})`;

        res.status(201).json({ message: "Employer created successfully" });
    } catch (error) {
        console.error("Error creating employer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// function to update employer details
export const updateEmployer = async (req, res) => {

    try {
        const { employer_id, company_name, company_description, company_website, company_logo } = req.body;

        await sql`UPDATE employers SET company_name = ${company_name}, company_description = ${company_description}, company_website = ${company_website}, company_logo = ${company_logo} WHERE employer_id = ${employer_id}`;

        res.status(200).json({ message: "Employer updated successfully" });
    } catch (error) {
        console.error("Error updating employer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}