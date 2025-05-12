import jwt from "jsonwebtoken";
import { sql } from "../lib/db.js";
import dotenv from "dotenv";

dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    //get the access token from the request cookies
    const token = req.cookies.token;

    //check if access token is provided in request cookies
    if (!token) {
      return res.status(401).json({
        message: "No access token provided",
      });
    }

    //decode access token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //find user from database

    const user = await sql`
        SELECT user_id, name, email, role, created_at 
        FROM users
        WHERE user_id = ${decoded.id}
    `;

    //check if user exists in the database
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user[0];
    next();
  } catch (error) {
    console.log("Error in  protectRoute", error.message);
    res.status(401).json({
      message: "Error in protectRoute",
      error: error.message,
    });
  }
};


export const employerRole = async (req, res, next) => {
  try {
    //check if user is an employer
    if (req.user && req.user.role === "employer") {
      next();
    } else {
      return res.status(403).json({
        message: "You are not authorized to access this route",
      });
    }
  } catch (error) {
    console.log("Error in employer route", error.message);
    res.status(403).json({
      message: "Error in adminRoute",
      error: error.message,
    });
  }
};
