
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
  res.send("Document Management System API is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
