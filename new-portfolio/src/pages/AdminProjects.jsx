import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Github } from "lucide-react";
import AddEditProjectModal from "../components/AddEditProjectModal"
import { deleteProject, getProjects, updateProject } from "../api/apis";
import placeholder from "../assets/placeHolder.png"

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);


    const fetchProjects = async () => {
        try {
            const response = await getProjects();
            setProjects(response.data.projects || []);
            console.log(response.data.projects);
            console.log(response.data.projects);
        } catch (error) {
            console.error("Error fetching projects", error);
        }
    };


    const handleAddClick = () => {
        setSelectedProject(null);
        setIsEditMode(false);
        setShowModal(true);
    };

    const handleEditClick = (project) => {
        setSelectedProject(project);
        setIsEditMode(true);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this project?")) {
            try {
                await deleteProject(id);
                fetchProjects();
            } catch (err) {
                console.error("Error deleting project:", err);
            }
        }
    };

    const toggleFeatured = async (id, current) => {
        try {
            await updateProject(id, { isFeatured: !current });
            fetchProjects();
        } catch (err) {
            console.error("Toggle featured error", err);
        }
    };

    const toggleVisibility = async (id, current) => {
        try {
            await updateProject(id, { isVisible: !current });
            fetchProjects();
        } catch (err) {
            console.error("Toggle visibility error", err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="p-6 text-white bg-gray-900 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Manage Projects</h2>
                <button
                    onClick={handleAddClick}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded shadow flex items-center gap-2"
                >
                    <Plus size={20} /> Add Project
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="bg-white/5 backdrop-blur p-4 rounded-xl shadow border border-white/10 flex flex-col h-full"
                    >
                        <img
                            src={
                                project?.imageUrl
                                    ? `${import.meta.env.VITE_API_BASE_URL}${project.imageUrl}`
                                    : placeholder
                            }
                            alt={project?.title || "No image available"}
                            className="w-full h-40 object-cover rounded mb-3 border border-white/10"
                        />

                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

                        <p className="text-sm text-gray-300 line-clamp-3 mb-3 h-full">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 text-xs mb-3">
                            {project.techStack.map((tech, i) => (
                                <span key={i} className="bg-gray-800 text-gray-100 px-2 py-0.5 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {(project?.liveUrl || project?.githubUrl) && (
                            <div className="flex gap-2 mt-1 mb-4">
                                {project?.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
                                    >
                                        Live
                                    </a>
                                )}
                                {project?.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition duration-200"
                                    >
                                        <Github className="w-4 h-4" />
                                        GitHub
                                    </a>
                                )}
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-auto">
                            <div className="flex gap-2">
                                <button onClick={() => handleEditClick(project)} className="text-blue-400 hover:text-blue-500">
                                    <Pencil size={20} />
                                </button>
                                <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-600">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 text-xs space-y-1">
                            <div className="flex items-center gap-2">
                                <label>Featured:</label>
                                <input
                                    type="checkbox"
                                    checked={project.isFeatured}
                                    onChange={() => toggleFeatured(project._id, project.isFeatured)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label>Visible:</label>
                                <input
                                    type="checkbox"
                                    checked={project.isVisible}
                                    onChange={() => toggleVisibility(project._id, project.isVisible)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <AddEditProjectModal
                    isEdit={isEditMode}
                    project={selectedProject}
                    onClose={() => {
                        setShowModal(false);
                        fetchProjects();
                    }}
                />
            )}
        </div>
    );
};

export default AdminProjects;
