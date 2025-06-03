import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./lib/db.js"; 
dotenv.config();

const app = express();

//import port from env  
const PORT = process.env.PORT || 5000;


//import routes
import authRoute from "./routes/authRoute.js";
import applicantRoute from "./routes/applicantRoute.js";
import employerRoute from "./routes/employerRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";


//Inbuilt middlewares
app.use(express.json()); // request body ko json me convert karne ke liye
app.use(express.urlencoded({ extended: true })); // form data ko json me convert karne ke liye
app.use(cookieParser()); // cookies ko parse karne ke liye
app.use(
  cors({
    origin: "https://job-hunt-frontend-7gid.onrender.com/", // frontend ka url
    credentials: true, // cookies ko accees karne ke liye
  })
);


//use routes
app.use("/auth", authRoute);
app.use("/applicant", applicantRoute);
app.use("/employer", employerRoute);
app.use("/job", jobRoute);
app.use("/application", applicationRoute);


//start server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB(); //connect to database
});
