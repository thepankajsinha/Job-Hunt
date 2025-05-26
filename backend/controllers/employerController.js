import dotenv from "dotenv";
import { sql } from "../lib/db.js";
dotenv.config();

export const createEmployer = async (req, res) => {
  const user_id = req.userId;
  const role = req.role;

  if (role !== "employer") {
    return res.status(403).json({ message: "Access denied. Employers only." });
  }

  try {
    const { company_name, company_description, company_website, company_logo } =
      req.body;

    if (!company_name || !company_description || !company_website) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await sql`
      INSERT INTO employers (user_id, company_name, company_description, company_website, company_logo)
      VALUES (${user_id}, ${company_name}, ${company_description}, ${company_website}, ${company_logo})`;

    res.status(201).json({ message: "Employer created successfully" });
  } catch (error) {
    console.error("Error creating employer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEmployer = async (req, res) => {
  const user_id = req.userId;

  try {
    const result =
      await sql`SELECT * FROM employers WHERE user_id = ${user_id}`;

    const employer = result[0];

    if (result.length === 0) {
      return res.status(200).json({ message: "Employer not found" });
    }

    res.status(200).json({ employer});
  } catch (error) {
    console.error("Error fetching employer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEmployer = async (req, res) => {
  const user_id = req.userId;

  try {
    const { company_name, company_description, company_website, company_logo } =
      req.body;

    if (!company_name || !company_description || !company_website) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await sql`
      UPDATE employers
      SET company_name = ${company_name},
          company_description = ${company_description},
          company_website = ${company_website},
          company_logo = ${company_logo}
      WHERE user_id = ${user_id}`;

    res.status(200).json({ message: "Employer updated successfully" });
  } catch (error) {
    console.error("Error updating employer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
