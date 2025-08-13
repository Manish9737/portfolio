import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];
const categories = ["Language", "Frontend", "Backend", "Database", "DevOps", "Mobile", "Tools", "Other"];

const TechStackModal = ({ isOpen, onClose, onSave, initialData }) => {
    const modalRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        icon: "",
        level: "",
        category: "",
        description: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                icon: initialData.icon || "",
                level: initialData.level || "",
                category: initialData.category || "",
                description: initialData.description || "",
            });
        } else {
            setForm({
                name: "",
                icon: "",
                level: "",
                category: "",
                description: "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setForm((prev) => ({
            ...prev,
            icon: file,
        }));
    };

    const handleSubmit = async () => {
        if (!form.name || !form.level || !form.category || !form.icon) {
            alert("Please fill all required fields.");
            return;
        }
        setLoading(true);
        await onSave(form);
        setLoading(false);

        if (!initialData) {
            setForm({
                name: "",
                icon: "",
                level: "",
                category: "",
                description: "",
            });
        }
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
            <div ref={modalRef} className="bg-white text-black rounded-lg shadow-2xl p-6 w-full max-w-lg relative" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold mb-6 text-center">
                    {initialData ? "Update Tech Stack" : "Add Tech Stack"}
                </h2>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium block mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="e.g. React"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">Icon</label>
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

                    <div>
                        <label className="block text-sm font-medium mb-1">Level</label>
                        <select
                            name="level"
                            value={form.level}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            <option value="" disabled >
                                Select level
                            </option>
                            {levels.map((lvl) => (
                                <option key={lvl} value={lvl}>
                                    {lvl}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className={inputClass}
                            placeholder="Brief description of the tech..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
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
                            className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition` + (loading ? "opacity-50 cursor-not-allowed" : "")}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : initialData ? "Update Skill" : "Add Skill"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TechStackModal;
