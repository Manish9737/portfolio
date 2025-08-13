// src/pages/BlogDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBlogById } from "../api/apis";
import placeHolder from "../assets/placeHolder.png";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-400">
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <p className="text-red-400 text-lg">Blog not found.</p>
        <Link
          onClick={() => window.history.back()}
          className="mt-4 text-sky-400 hover:underline flex items-center"
        >
          <ArrowLeft size={18} className="mr-1" /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 sm:px-8 md:px-16 lg:px-24 py-10">
      
      <Link
        to="/blogs"
        className="mb-8 inline-flex items-center text-sky-400 hover:text-sky-300 transition"
      >
        <ArrowLeft size={18} className="mr-1" /> Back to Blogs
      </Link>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden">
        
        <div className="w-full h-64 sm:h-80 md:h-[28rem] overflow-hidden">
          <img
            src={
              blog.coverImage
                ? `${import.meta.env.VITE_API_BASE_URL}${blog.coverImage}`
                : placeHolder
            }
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2  bg-gradient-to-r from-sky-400 to-pink-300 bg-clip-text text-transparent">
            {blog.title}
          </h1>

          <p className="text-sm text-gray-400 mb-4">
            By <span className="text-white font-medium">{blog.author || "Unknown"}</span> •{" "}
            {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Date unavailable"}
          </p>

          {blog.excerpt && (
            <p className="italic text-gray-300 mb-6 border-l-4 border-sky-400 pl-4">
              {blog.excerpt}
            </p>
          )}

          <div
            className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content || "<p>No content available.</p>" }}
          />

          {blog.tags?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3 text-sky-300">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-sky-400/10 border border-sky-400/30 text-sky-300 px-3 py-1 rounded-full text-sm hover:bg-sky-400/20 transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
            <p className="mt-6 text-xs text-gray-500">
              Last updated on {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
