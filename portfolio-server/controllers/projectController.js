const Project = require("../models/project");
const fs = require("fs");
const path = require("path");

// @desc   Add new project
// @route  POST /api/projects
exports.addProject = async (req, res) => {
  try {
    const data = { ...req.body };
    if (typeof data.imageUrl === "object") {
      delete data.imageUrl;
    }
    const newProject = new Project(data);
    if (req.file) {
      newProject.imageUrl = `/uploads/${req.file.filename}`;
    }
    const savedProject = await newProject.save();
    res.status(201).json({ success: true, data: savedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error.message);
  }
};

// @desc   Get all projects
// @route  GET /api/projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc   Get single project
// @route  GET /api/projects/:id
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc   Update project (remove old image if replaced)
// @route  PUT /api/projects/:id
exports.updateProject = async (req, res) => {
  try {
    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const updateData = { ...req.body };

    if (req.file) {
      if (existingProject.imageUrl) {
        const oldPath = path.join(__dirname, "..", existingProject.imageUrl);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error.message);
  }
};

// @desc   Delete project (remove image too)
// @route  DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    if (project.imageUrl) {
      const oldPath = path.join(__dirname, "..", project.imageUrl);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    await Project.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
