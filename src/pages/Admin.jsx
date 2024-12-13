import React, { useState } from "react";
import API from "../api/api";

const Admin = () => {
  const [form, setForm] = useState({ title: "", description: "", image: "", link: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/projects", form);
      alert("Project added successfully!");
      setForm({ title: "", description: "", image: "", link: "" });
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Project Title" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
        <input type="text" name="link" value={form.link} onChange={handleChange} placeholder="Project Link" />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default Admin;
