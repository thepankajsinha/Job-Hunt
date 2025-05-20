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
import userRoute from "./routes/userRoute.js";
import employerRoute from "./routes/employerRoute.js";
import jobRoute from "./routes/jobRoute.js";


//Inbuilt middlewares
app.use(express.json()); // request body ko json me convert karne ke liye
app.use(express.urlencoded({ extended: true })); // form data ko json me convert karne ke liye
app.use(cookieParser()); // cookies ko parse karne ke liye
app.use(
  cors({
    origin: "http://localhost:5173", // frontend ka url
    credentials: true, // cookies ko accees karne ke liye
  })
);


//use routes
app.use("/user", userRoute);
app.use("/employer", employerRoute);
app.use("/job", jobRoute);


//start server
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB(); //connect to database
});
