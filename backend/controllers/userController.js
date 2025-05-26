import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { sql } from "../lib/db.js";
dotenv.config();

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await sql`SELECT * FROM users WHERE user_id = ${userId}`;

    const user = result[0];

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    delete user.password_hash;

    res.json({ user, message: "Profile fetched successfully" });
  } catch (error) {
    console.error("Error in getProfile:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.userId;

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`UPDATE users SET name = ${name}, email = ${email}, password_hash = ${hashedPassword} WHERE user_id = ${userId}`;

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error in updateProfile:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
