import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

const connectDB = async () => {
    try {
        const result = await sql`SELECT version()`;
        const { version } = result[0];
        console.log("Database connected successfully");
        
    } catch (error) {
        console.error("Error connecting to the database", error);
    }
};

export { sql, connectDB };
