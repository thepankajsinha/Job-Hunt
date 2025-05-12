import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
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
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;


    res.status(201).json({
      message: "User created successfully",
        user: {
            id: user[0].user_id,
            name: user[0].name,
            email: user[0].email,
            role: user[0].role,
        },
    });
  } catch (error) {
    console.log("Error in register", error.message);
    res.status(500).json({ message: "Error in signup" });
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
            return res.status(404).json({ message: "User not found" });
        }
        
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user[0].password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        // Create and send JWT token
        const token = jwt.sign({ id: user[0].user_id }, process.env.JWT_SECRET, { expiresIn: '3d' });

        //set token in cookies
        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            sameSite: 'strict', // CSRF protection
        });
        
        res.json({ message: "Logged in successfully", user: {
            id: user[0].user_id,
            name: user[0].name,
            email: user[0].email,
            role: user[0].role,
        } })
        
    } catch (error) {
        console.log("Error in login", error.message);
        res.status(500).json({ message: "Error in login", error: error.message });
    }
};



export const logout = async (req, res) => {
    try {

        // Clear access token from cookies
        res.clearCookie("token");
        
        res.json({ message: "Logged out successfully" });
        
    } catch (error) {
        console.log("Error in logout", error.message);
        res.status(500).json({ message: "Error in logout", error: error.message });
    }
};

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
        console.log("Error in getProfile", error.message);
        res.status(500).json({ message: "Error in getProfile", error: error.message });
	}
};