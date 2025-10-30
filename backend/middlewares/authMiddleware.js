import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sql } from "../lib/db.js";
dotenv.config();

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided, please login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.log("Error in isAuth middleware:", error.message);
    res.status(401).json({ message: "Unauthorized, please login" });
  }
};


export const isEmployer = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided, please login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "employer") {
      return res.status(403).json({ message: "Unauthorized, you are not an employer" });
    }

    const result = await sql`SELECT employer_id FROM employers WHERE user_id = ${decoded.userId}`;

    if (result.length === 0) {
      return res.status(403).json({ message: "Employer not found" });
    }

    req.userId = decoded.userId;
    req.employerId = result[0].employer_id;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.log("Error in isEmployer middleware:", error.message);
    res.status(401).json({ message: "Unauthorized, please login" });
  }
};
