const sendEmail = require("../config/email");
const ContactUs = require("../models/contactUs");

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactUs.find().sort({ createdAt: -1 });

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Error fetching contacts", error: error.message });
  }
};

exports.createContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const newContact = new ContactUs({
      name,
      email,
      message,
    });

    await newContact.save();
    return res.status(201).json({
      message: "Contact created successfully",
      contact: newContact,
    });
  } catch (error) {
    console.log("Error creating contact:", error.message);
    return res(500).json({
      message: "Error creating contact",
      error: error.message,
    });
  }
};

exports.getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await ContactUs.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json(contact);
  } catch (error) {
    console.log("Error fetching contact:", error.message);
    return res.status(500).json({
      message: "Error fetching contact",
      error: error.message,
    });
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await ContactUs.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log("Error deleting contact:", error.message);
    return res.status(500).json({
      message: "Error deleting contact",
      error: error.message,
    });
  }
};

exports.sendEmailController = async (req, res) => {
  const { to, sub, name, message } = req.body;

  const html = `
<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f6f9fc; color: #333;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background: #0f172a; padding: 20px; text-align: center; color: #fff;">
            <h1 style="margin: 0; font-size: 24px;">Thank You for Reaching Out!</h1>
          </div>
          <div style="padding: 20px;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for contacting me through my portfolio website. I truly appreciate your interest and the time you took to send this message:</p>
            <blockquote style="background: #f0f4f8; padding: 15px; border-left: 4px solid #0f172a; margin: 10px 0; font-style: italic;">
              ${message}
            </blockquote>
            <p>I will review your message and get back to you as soon as possible.</p>
            <p>Best regards,</p>
            <p><strong>Manishkumar Kumavat</strong><br/>
               MERN Stack Developer<br/>
               📧 kumavatmanish5@gmail.com</p>
          </div>
          <div style="background: #f6f9fc; padding: 10px; text-align: center; font-size: 12px; color: #777;">
            © ${new Date().getFullYear()} Manishkumar Kumavat. All rights reserved.
          </div>
        </div>
      </div>
  `;

  if (!to || !sub || !html) {
    return res.status(400).json({
      success: false,
      message: "All fields (to, sub, html) are required!",
    });
  }

  try {
    const result = await sendEmail(to, sub, html);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
        error: result.error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      info: result.info,
    });
  } catch (error) {
    console.error("Error in sendEmailController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
