const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDb = require("./config/db");
const cors = require("cors");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User =  mongoose.model("User", userSchema);

const app = express();

// ENV variables
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
// Simple route
app.post("/", (req, res) => {
  const { name, email, password } = req?.body ?? {};

    const newUser = new User({ name, email, password });
    console.log(newUser,req.body);
    newUser.save()

    return res.status(201).json({ message: "User created successfully", user: newUser });
});
app.get("/",(_,res)=>res.send("Hi it works."))

app.listen(PORT, () => {
  connectDb()
      .then(() => console.log("Connected to MongoDB"))  
  console.log(`Server running on port ${PORT}`);
});