import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { getTechStackById } from "../api/apis";
import placeHolder from "../assets/placeHolder.png";

const SkillDetails = () => {
    const { id } = useParams();
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const res = await getTechStackById(id);
                setSkill(res.data);
            } catch (error) {
                console.error("Error fetching skill details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkill();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10 text-lg text-white">Loading...</div>;
    }

    if (!skill) {
        return (
            <div className="text-center mt-10 text-lg text-red-400">
                Skill not found
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto px-6 py-12 text-white"
        >
            <Link
                onClick={() => { window.history.back() }}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8"
            >
                <ArrowLeft size={18} /> Back to Skills
            </Link>

            <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row gap-10">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 w-full md:w-1/3 flex items-center justify-center bg-white/10 rounded-2xl border border-white/10 p-6"
                >
                    <img
                        src={skill.icon
                            ? `${import.meta.env.VITE_API_BASE_URL}${skill.icon}`
                            : placeHolder
                        }
                        alt={skill.name}
                        className="w-40 h-40 object-contain drop-shadow-lg"
                    />
                </motion.div>

                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-4">{skill.name}</h1>
                    <p className="text-gray-300 mb-6">{skill.description || "No description available."}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/10 border border-white/10 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Category</p>
                            <p className="text-lg font-semibold">{skill.category}</p>
                        </div>
                        <div className="bg-white/10 border border-white/10 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">Level</p>
                            <p className="text-lg font-semibold">{skill.level}</p>
                        </div>
                    </div>

                    {skill.relatedTechnologies && skill.relatedTechnologies.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Related Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {skill.relatedTechnologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-sm text-gray-200"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SkillDetails;
