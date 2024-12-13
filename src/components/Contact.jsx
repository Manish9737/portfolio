import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import emailjs from "emailjs-com"; 
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_mbzhob7"; // Replace with your Service ID
    const templateID = "template_rulqikc"; // Replace with your Template ID
    const userID = "Y0EAunwc3m733n7L8"; // Replace with your User ID

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setIsSent(true);
        setError(null);
        setFormData({ name: "", email: "", message: "" }); // Clear form
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
        setError("Failed to send your message. Please try again later.");
      });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero text-center">
        <div className="container">
          <h1 className="hero-title">Get In Touch</h1>
          <p className="hero-subtitle">
            Have questions or want to discuss your project? Drop us a message!
          </p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row">
          {/* Contact Info */}
          <div className="col-md-6 contact-info" data-aos="fade-right">
            <h2>Contact Information</h2>
            <p>
              I’m here to help and answer any question you might have. I’m look
              forward to hearing from you!
            </p>
            <div className="info-item">
              <FaMapMarkerAlt className="icon" />
              <p>Nikol, Ahmedabad, India</p>
            </div>
            <div className="info-item">
              <FaPhone className="icon" />
              <p>+91 973-798-2616</p>
            </div>
            <div className="info-item">
              <FaEnvelope className="icon" />
              <p>kumavatmanish5@gmail.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-6">
            <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-left">
              <h2>Send a Message</h2>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  className="form-control"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                <FaPaperPlane /> Send Message
              </button>
              {isSent && <p className="text-success mt-3">Message sent successfully!</p>}
              {error && <p className="text-danger mt-3">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
