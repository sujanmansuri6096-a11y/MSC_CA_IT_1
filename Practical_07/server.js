
require("dotenv").config();

const express = require("express");
const connectDB = require("./db");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// Middleware
app.use(express.json());

// Connect MongoDB Atlas
connectDB();

// Home route
app.get("/", (req, res) => {
  res.send("Employee Management API is running");
});

// Employee routes
app.use("/api/employees", employeeRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
