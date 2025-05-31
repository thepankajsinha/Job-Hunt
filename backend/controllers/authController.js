import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sql } from "../lib/db.js";
dotenv.config();

export const registerApplicant = async (req, res) => {
  try {
    // Destructure the request body to get applicant details
    const {first_name, last_name, profile_summary,resume_url, skills, email, password} = req.body;


    // Check if the user already exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    //first insert into users table
    const result = await sql`
      INSERT INTO users (email, password_hash, role)
      VALUES (${email}, ${hashedPassword}, 'job_seeker')
      RETURNING user_id
    `;

    //get the user_id from the result
    if (result.length === 0) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const userId = result[0]?.user_id;

    
    //then insert into applicants table
    await sql`
      INSERT INTO applicants (user_id, first_name, last_name, profile_summary, resume_url, skills)
      VALUES (${userId}, ${first_name}, ${last_name}, ${profile_summary}, ${resume_url}, ${skills})
    `;

    res.status(201).json({
      message: "Applicant registered successfully"
    });
  } catch (error) {
    console.error("Error in registerApplicant controller:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const registerEmployer = async (req, res) => {
  try {
    // Destructure the request body to get employer details
    const {name, description,website_url,logo_url,industry, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    //first insert into users table
    const result = await sql`
      INSERT INTO users (email, password_hash, role)
      VALUES (${email}, ${hashedPassword}, 'employer')
      RETURNING user_id
    `;

    //get the user_id from the result
    const userId = result[0].user_id;

    //then insert into employers table
    await sql`
      INSERT INTO employers (user_id, name, description, website_url, logo_url, industry)
      VALUES (${userId}, ${name}, ${description}, ${website_url}, ${logo_url}, ${industry})
    `;

    res.status(201).json({
      message: "Employer registered successfully"
    });
  } catch (error) {
    console.error("Error in registerEmployer controller:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.user_id, role: user.role },process.env.JWT_SECRET,{ expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Use 'none' if production and frontend hosted on different domain
      secure: process.env.NODE_ENV === "production", // secure true only in production (HTTPS)
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    
    delete user.password_hash;

    res.status(200).json({
      message: "Login successful",
      data: user
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {

    // Clear the cookie to log out the user
    res.clearCookie("token");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Directly return decoded data (contains userId and role)
    const { userId, role } = decoded;

    res.status(200).json({
      data: { userId, role },
    });
  } catch (error) {
    console.error("Error in getCurrentUser:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};