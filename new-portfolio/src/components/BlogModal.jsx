import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const BlogModal = ({ isOpen, onClose, onSave, initialData }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    tags: "",
    author: "Admin",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        tags: initialData.tags?.join(", ") || "",
      });
    } else {
      setForm({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        coverImage: "",
        tags: "",
        author: "Admin",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, coverImage: file }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSave(form);
    setLoading(false);
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4" onClick={handleOverlayClick}>
      <div ref={modalRef} className="bg-white text-black rounded-lg shadow-2xl p-6 w-full max-w-4xl relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-center">
          {initialData ? "Update Blog" : "Add Blog"}
        </h2>

        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            <label className="text-sm font-medium block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
              placeholder="Blog title"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Slug</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className={inputClass}
              placeholder="blog-title-slug"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium block mb-1">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={4}
              className={inputClass}
              placeholder="Full blog content..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium block mb-1">Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows={2}
              className={inputClass}
              placeholder="Short description..."
            />
          </div>



          <div>
            <label className="text-sm font-medium block mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className={inputClass}
              placeholder="react, javascript, node"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              className={inputClass}
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 "
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              disabled={loading}
            >
              {loading ? "Saving..." : initialData ? "Update Blog" : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
