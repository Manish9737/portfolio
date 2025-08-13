import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../api/apis";
import placeHolder from "../assets/placeHolder.png"

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await getBlogs();
                setBlogs(res.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    const handleBlogClick = (id) => {
        navigate(`/blogs/${id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans px-4 sm:px-8 md:px-16 lg:px-24 py-10"
        >
            <h1 className="text-3xl font-bold mb-6 text-center">Our Blogs</h1>
            {blogs.length === 0 ? (
                <p className="text-center text-gray-500">Loading blogs...</p>
            ) : (
                <div className="flex flex-col gap-8">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            onClick={() => handleBlogClick(blog._id)}
                            className="cursor-pointer flex flex-col md:flex-row bg-white/10 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] overflow-hidden"
                        >
                            {/* Image Side */}
                            {blog.coverImage && (
                                <div className="md:w-1/4 w-full">
                                    <img
                                        src={blog.coverImage
                                            ? `${import.meta.env.VITE_API_BASE_URL}${blog.coverImage}`
                                            : placeHolder
                                        }
                                        alt={blog.title}
                                        className="h-60 md:h-full w-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Text Side */}
                            <div className="md:w-1/2 w-full p-6 flex flex-col justify-center">
                                <h2 className="text-2xl font-semibold mb-3">{blog.title}</h2>
                                <p className="text-gray-300 text-sm sm:text-base line-clamp-4">
                                    {blog.description}
                                </p>
                                <p className="mt-4 text-sky-400 font-medium text-sm">
                                    Read More →
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default Blogs;
