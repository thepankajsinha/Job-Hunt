import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sql } from "../lib/db.js";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

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

    res.json({ user, message: "Logged in successfully" });
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
