import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from "./config/database.js";

// Load values from a local .env file into process.env.
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from other applications, such as the frontend.
app.use(cors());

// Parse incoming JSON request bodies.
app.use(express.json());

// Simple endpoint for checking whether the API is running.
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Expense Tracker API is running",
  });
});

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
