import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided, please login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

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

    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.log("Error in isEmployer middleware:", error.message);
    res.status(401).json({ message: "Unauthorized, please login" });
  }
};
