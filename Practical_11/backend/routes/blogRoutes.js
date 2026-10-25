
const express = require("express");
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

// Get single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: "Invalid blog ID" });
  }
});

// Create blog (login required)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      author: req.user.id,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog" });
  }
});

// Update own blog (admin can update any blog)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const isOwner = blog.author.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "You can update only your own blogs",
      });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    blog.title = title;
    blog.content = content;

    await blog.save();

    res.json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to update blog" });
  }
});

// Delete own blog (admin can delete any blog)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const isOwner = blog.author.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "You can delete only your own blogs",
      });
    }

    await blog.deleteOne();

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete blog" });
  }
});

// Admin-only example endpoint
router.get("/admin/manage", authMiddleware, adminMiddleware, async (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

module.exports = router;
