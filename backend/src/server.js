
console.log("🔥 THIS SERVER FILE IS RUNNING");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env")
});

console.log("ENV TEST:", process.env.MONGO_URI ? "FOUND" : "NOT FOUND");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Allow Vite frontend
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
