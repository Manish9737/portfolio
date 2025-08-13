import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { createContactRequest } from "../api/apis";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("");

    try {
      // 1. Send email via EmailJS
      const emailResult = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (emailResult.status === 200) {
        // 2. If email sent successfully, save in DB
        await createContactRequest(form);

        setStatus("Email sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Email sending failed.");
      }
    } catch (error) {
      console.error("Error sending email or saving request:", error);
      setStatus("Something went wrong.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl max-w-xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Contact Me</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/20 placeholder-gray-300 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/20 placeholder-gray-300 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
          <textarea
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/20 placeholder-gray-300 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          {isSending ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p className="text-sm mt-3 text-center text-white/80">{status}</p>
        )}
      </form>
    </motion.div>
  );
};

export default Contact;
