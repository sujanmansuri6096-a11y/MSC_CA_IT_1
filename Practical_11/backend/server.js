
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Blog Management System API is running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });
