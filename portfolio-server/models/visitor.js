const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  referrer: String,
  date: Date,
});

const Visitor = mongoose.model("Visitor", VisitorSchema);
module.exports = Visitor;
