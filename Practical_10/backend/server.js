
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const Student = require("./src/Student");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("MERN Application Backend is Running");
});


app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.log("MongoDB Error:", error.message));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
