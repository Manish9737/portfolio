import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { getTechStack, deleteTechStack, addTechStack, updateTechStack } from "../api/apis";
import TechStackModal from "../components/TechStackModal";
import placeHolder from "../assets/placeHolder.png";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const fetchSkills = async () => {
    setDataLoading(true);
    try {
      const res = await getTechStack();
      setSkills(res.data);
      setDataLoading(false);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      setDataLoading(false);
    }
  };

  const deleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    setDeleteLoading(true)
    try {
      await deleteTechStack(id);
      setDeleteLoading(false)
      setSkills(skills.filter((skill) => skill._id !== id));
    } catch (error) {
      console.error("Failed to delete skill:", error);
      setDeleteLoading(false)
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedSkill) {
        const res = await updateTechStack(selectedSkill._id, data);
        setSkills(
          skills.map((skill) =>
            skill._id === selectedSkill._id ? res.data : skill
          )
        );
      } else {
        const res = await addTechStack(data);
        setSkills([...skills, res.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save skill:", error);
    }
  };

  const openAddModal = () => {
    setSelectedSkill(null);
    setModalOpen(true);
  };

  const openUpdateModal = (skill) => {
    setSelectedSkill(skill);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSkill(null);
    setModalOpen(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <section className="px-4 sm:px-6 md:px-10 py-6 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold">Admin Tech Stack</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {dataLoading ? (
        <div className="text-center text-gray-400">Loading skills...</div>
      ) : skills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="relative w-full max-w-sm mx-auto backdrop-blur-lg bg-white/10 border border-white/20 text-white rounded-xl shadow-lg p-5 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-15 aspect-square bg-white rounded-md p-1.5 flex items-center justify-center shadow-inner">
                    <img
                      src={skill.icon 
                        ? `${import.meta.env.VITE_API_BASE_URL}${skill.icon}`
                        : placeHolder
                      }
                      alt={skill.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-tight">{skill.name}</h3>
                    <p className="text-sm text-gray-300">{skill.level} • {skill.category}</p>
                  </div>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => openUpdateModal(skill)}
                    className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded-full"
                    title="Edit"
                    disabled={deleteLoading}
                  >
                    <Pencil className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => deleteSkill(skill._id)}
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

              {/* {skill.description && (
                <p className="text-sm text-gray-200 mt-2 line-clamp-3">
                  {skill.description}
                </p>
              )} */}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No skills available</div>
      )}

      {/* Modal */}
      <TechStackModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        initialData={selectedSkill}
      />
    </section>
  );
};

export default AdminSkills;
