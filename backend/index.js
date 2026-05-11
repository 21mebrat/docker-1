const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/db");

const app = express();

// =========================
// Middleware
// =========================
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://54.159.5.211",
      "http://localhost:3000",
      "http://localhost:5173"
    ],
    credentials: true
  })
);

// =========================
// MongoDB Schema
// =========================
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// =========================
// Routes
// =========================

// Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Create user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      user: newUser
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});

// Get all users (useful for testing)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Server Start
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on port ${PORT}`);
});