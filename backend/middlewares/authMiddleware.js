import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sql } from "../lib/db.js";
dotenv.config();

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No token provided, please login",
      });
    }

    //decode access token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //set userId in request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("Error in isAuth middleware", error.message);
    res.status(401).json({
      message: "Unauthorized, please login",
      error: error.message,
    });
  }
};

export const isEmployer = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No token provided, please login",
      });
    }

    // Decode access token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if role is employer
    if (decoded.role !== "employer") {
      return res.status(403).json({
        message: "Access denied. Employers only.",
      });
    }

    //find employer id in database
    const employer = await sql`SELECT * FROM employers WHERE user_id = ${decoded.userId}`;


    // Set user info in request
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.employerId = employer[0].employer_id;

    next();
  } catch (error) {
    console.log("Error in isEmployer middleware", error.message);
    res.status(401).json({
      message: "Unauthorized, please login",
      error: error.message,
    });
  }
};