import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sql } from "../lib/db.js";
dotenv.config();

export const register = async (req, res) => {
  try {
    // Validate request body
    const { name, email, password, role } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check if email already exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await sql`INSERT INTO users (name, email, password_hash, role) VALUES (${name}, ${email}, ${hashedPassword}, ${role})`;

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error in register:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
    try {
        //Validate request body
        const { email, password } = req.body;
        
        if (!email ||!password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        
        // Check if user exists
        const user = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user[0].password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create and send JWT token
        const token = jwt.sign({ userId: user[0].user_id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        //set token in cookies
        res.cookie('token', token,{
            httpOnly: true,
            sameSite: 'strict', // CSRF protection
        });
        
        res.json({ message: "Logged in successfully"})
        
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


export const logout = async (req, res) => {
  try {
    // Clear access token from cookies
    res.clearCookie("token");

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const getProfile = async (req, res) => {
  try {
    // Get user ID from request
    const userId = req.userId;

    // Fetch user profile from database
    const user = await sql`SELECT user_id, name, email, role FROM users WHERE user_id = ${userId}`;

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user[0]);
  } catch (error) {
    console.error("Error in getProfile:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    // Get user ID from request
    const userId = req.userId;

    // Delete user from database
    await sql`DELETE FROM users WHERE user_id = ${userId}`;

    // Clear access token from cookies
    res.clearCookie("token");

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProfile:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};