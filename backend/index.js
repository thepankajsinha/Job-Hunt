import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {connectDB} from "./lib/db.js";


//import routes
import authRoutes from "./routes/authRoute.js";
import jobRoutes from "./routes/jobRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//inbuilt middlewares
app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

//use routes
app.use("/auth", authRoutes);
app.use("/job", jobRoutes);


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
});
