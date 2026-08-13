const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();

app.use(express.json());
connectDB();


app.get("/", (req, res) => {
  res.json({
    message: "CRUD API is running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});