const Blogs = require("../models/blogs");
const fs = require("fs");
const path = require("path");

const removeFile = (filePath) => {
  try {
    if (!filePath || filePath.includes("placeholder-blog.jpg")) return; 
    const fullPath = path.join(__dirname, "..", filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (err) {
    console.error("Error deleting file:", err.message);
  }
};

exports.createBlog = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title || !data.content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newBlog = new Blogs({
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      coverImage: req.file
        ? `/uploads/${req.file.filename}`
        : "/uploads/placeholder-blog.jpg",
      tags: data.tags || [],
      author: data.author || "Admin",
    });

    await newBlog.save();
    return res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find().sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blogs.findOne({ slug: slug.toLowerCase() });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const existingBlog = await Blogs.findById(id);

    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const updateData = { ...req.body };

    if (req.file) {
      removeFile(existingBlog.coverImage);
      updateData.coverImage = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    removeFile(blog.coverImage);

    await Blogs.findByIdAndDelete(id);

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
