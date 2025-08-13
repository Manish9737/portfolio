const Visitor = require("../models/Visitor");
const fetch = require("node-fetch");

exports.getVisits = async (req, res) => {
  try {
    const visits = await Visitor.find().sort({ date: -1 });
    res.status(200).json(visits);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve visits" });
  }
};

exports.createVisit = async (req, res) => {
  try {
    const visitor = new Visitor({
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      referrer: req.headers["referer"] || "Direct",
      date: new Date(),
    });

    await visitor.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Tracking failed" });
  }
};
