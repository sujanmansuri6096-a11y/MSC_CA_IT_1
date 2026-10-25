
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Document = require("../models/Document");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please select a file" });
    }

    const document = await Document.create({
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileType: path.extname(req.file.originalname),
      fileSize: req.file.size,
    });

    res.status(201).json({
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { originalName: req.body.originalName },
      { new: true, runValidators: true }
    );

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({ message: "Document updated successfully", document });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const filePath = path.resolve(document.filePath);
    if (filePath.startsWith(path.resolve(uploadDir) + path.sep)) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
