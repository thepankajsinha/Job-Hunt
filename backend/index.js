import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./lib/db.js";
dotenv.config();


//import routes
import userRoute from "./routes/userRoute.js";
import employerRoute from "./routes/employerRoute.js";


const app = express();
const PORT = process.env.PORT || 5000;



//inbuilt middlewares
app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true, // if you use cookies/sessions
  })
);

//use routes
app.use("/user", userRoute);
app.use("/employer", employerRoute);


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
});
