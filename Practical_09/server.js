
require("dotenv").config();

const express = require("express");
const multer = require("multer");
const path = require("path");
const connectDB = require("./db");
const File = require("./File");

const app = express();

connectDB();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("File Upload Module is Running");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileData = await File.create({
      filename: req.file.originalname,
      filepath: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: fileData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/files", async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
