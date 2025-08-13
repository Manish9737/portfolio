import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { addProject, updateProject } from "../api/apis";

const categories = ["Frontend", "Backend", "Full Stack", "Mobile App", "Other"];

const AddEditProjectModal = ({ isEdit = false, project = null, onClose }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    category: "Other",
    isFeatured: false,
    isVisible: true,
    order: 0,
  });

  useEffect(() => {
    if (isEdit && project) {
      setFormData({
        ...project,
        techStack: project.techStack.join(", "),
      });
    }
  }, [isEdit, project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      imageUrl: file, // store the File directly under imageUrl
      imagePreview: URL.createObjectURL(file), // optional: for preview
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();

      formPayload.append("title", formData.title);
      formPayload.append("description", formData.description);
      formPayload.append("liveUrl", formData.liveUrl);
      formPayload.append("githubUrl", formData.githubUrl);
      formPayload.append("category", formData.category);
      formPayload.append("isFeatured", formData.isFeatured);
      formPayload.append("isVisible", formData.isVisible);
      formPayload.append("order", formData.order);

      // Tech stack as array
      const techStackArray = formData.techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
      techStackArray.forEach((tech) => formPayload.append("techStack[]", tech)); // brackets to indicate array

      // Append image if exists
      if (formData.imageUrl instanceof File) {
        formPayload.append("imageUrl", formData.imageUrl);
      }

      if (isEdit) {
        await updateProject(project._id, formPayload);
      } else {
        await addProject(formPayload);
      }

      onClose();
    } catch (error) {
      console.error("Project submission failed:", error);
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4" onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className="bg-white text-black rounded-lg shadow-2xl p-6 w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {isEdit ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Title */}
          <div className="col-span-2">
            <label className="text-sm font-medium mb-1 block">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Order */}
          <div>
            <label className="text-sm font-medium mb-1 block">Order</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Tech Stack */}
          <div className="col-span-3">
            <label className="text-sm font-medium mb-1 block">Tech Stack</label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className={inputClass}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          {/* Description */}
          <div className="col-span-3">
            <label className="text-sm font-medium mb-1 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={inputClass}
              placeholder="Project description..."
              required
            />
          </div>

          {/* URLs */}
          <div className="col-span-2">
            <label className="text-sm font-medium mb-1 block">Live URL</label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://live-url.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">GitHub URL</label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://github.com/project"
            />
          </div>

          {/* Image URL */}
          <div className="col-span-3">
            <label className="text-sm font-medium mb-1 block">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
            />
          </div>

          {/* Category */}
          <div className="col-span-2">
            <label className="text-sm font-medium mb-1 block">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col justify-center gap-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                name="isVisible"
                checked={formData.isVisible}
                onChange={handleChange}
              />
              Visible
            </label>
          </div>

          {/* Submit */}
          <div className="col-span-3">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              {isEdit ? "Update Project" : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProjectModal;
