const nodemailer = require("nodemailer");
require("dotenv").config();


// Create reusable transporter
const transporter = nodemailer.createTransport({
 service: "Gmail",
  auth: {
    user: process.env.SMTP_USER, // Email user
    pass: process.env.SMTP_PASS, // Email password / app password
  },
});

/**
 * Send an email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML body content
 * @returns {Promise} - Resolves if email sent successfully
 */
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw { success: false, error };
  }
};

module.exports = sendEmail;