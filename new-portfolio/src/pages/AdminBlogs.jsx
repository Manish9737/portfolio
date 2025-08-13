import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Calendar } from "lucide-react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../api/apis";
import BlogModal from "../components/BlogModal";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    setDataLoading(true);
    try {
      const res = await getBlogs();
      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const deleteBlogItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setDeleteLoading(true);
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedBlog) {
        const res = await updateBlog(selectedBlog._id, {
          ...data,
          tags: data.tags.split(",").map((t) => t.trim()),
        });
        setBlogs(blogs.map((b) => (b._id === selectedBlog._id ? res.data : b)));
      } else {
        const res = await createBlog({
          ...data,
          tags: data.tags.split(",").map((t) => t.trim()),
        });
        setBlogs([...blogs, res.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save blog:", error);
    }
  };

  const openAddModal = () => {
    setSelectedBlog(null);
    setModalOpen(true);
  };

  const openUpdateModal = (blog) => {
    setSelectedBlog(blog);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setModalOpen(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="px-4 sm:px-6 md:px-10 py-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold">Admin Blogs</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          <Plus className="w-4 h-4" />
          Add Blog
        </button>
      </div>

      {/* Data Loader */}
      {dataLoading ? (
        <div className="text-center text-gray-400">Loading blogs...</div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="group relative w-full max-w-sm mx-auto backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Cover Image */}
              <div className="h-40 w-full bg-gray-700">
                <img
                  src={
                    blog.coverImage
                      ? `${import.meta.env.VITE_API_BASE_URL}${blog.coverImage}`
                      : "/uploads/placeholder-blog.jpg"
                  }
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Blog Content */}
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
                  <p className="text-xs text-gray-400 mb-2">Slug: {blog.slug}</p>
                  <p className="text-sm text-gray-300 mb-2 line-clamp-3">
                    {blog.excerpt || blog.content?.substring(0, 120) + "..."}
                  </p>
                  {blog.tags?.length > 0 && (
                    <p className="text-xs text-gray-400 mb-2">
                      Tags: {blog.tags.join(", ")}
                    </p>
                  )}
                </div>

                {/* Footer Info */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <span>By {blog.author || "Unknown"}</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions - now show only on hover of the card */}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => openUpdateModal(blog)}
                  className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded-full"
                  title="Edit"
                  disabled={deleteLoading}
                >
                  <Pencil className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => deleteBlogItem(blog._id)}
                  className={`p-1.5 bg-red-600 hover:bg-red-700 rounded-full ${deleteLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  title="Delete"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>

          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No blogs available</div>
      )}

      {/* Modal */}
      <BlogModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        initialData={selectedBlog}
      />
    </section>
  );
};

export default AdminBlogs;
