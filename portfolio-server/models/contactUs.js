const { default: mongoose } = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
});

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
module.exports = ContactUs;