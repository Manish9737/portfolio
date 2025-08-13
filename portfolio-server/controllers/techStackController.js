const Tech = require("../models/techStack");
const fs = require("fs");
const path = require("path");

exports.getTechStack = async (req, res) => {
  try {
    const techs = await Tech.find().sort({ order: 1 });
    res.json(techs);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getTechStackById = async (req, res) => {
  const { id } = req.params;

  try {
    const tech = await Tech.findById(id);
    if (!tech) return res.status(404).json({ error: "Tech not found" });
    res.json(tech);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

exports.addTechStack = async (req, res) => {
  try {
    const tech = new Tech(req.body);
    if (req.file) {
      tech.icon = `/uploads/${req.file.filename}`;
    }
    await tech.save();
    res.status(201).json(tech);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTechStack = async (req, res) => {
  try {
    const tech = await Tech.findById(req.params.id);
    if (!tech) return res.status(404).json({ error: "Tech not found" });

    if (tech.icon) {
      const oldPath = path.join(__dirname, "..", tech.icon);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    await Tech.findByIdAndDelete(req.params.id);
    res.json({ message: "Tech deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateTechStack = async (req, res) => {
  try {
    const existingTech = await Tech.findById(req.params.id);
    if (!existingTech) {
      return res.status(404).json({ error: "Tech not found" });
    }

    const data = { ...req.body };

    if (req.file) {
      if (existingTech.icon) {
        const oldPath = path.join(__dirname, "..", existingTech.icon);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      data.icon = `/uploads/${req.file.filename}`;
    }

    const tech = await Tech.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.json(tech);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
