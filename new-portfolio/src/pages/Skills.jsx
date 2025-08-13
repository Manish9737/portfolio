import { motion } from "framer-motion";
import { getTechStack } from "../api/apis";
import { useEffect, useState } from "react";
import placeHolder from "../assets/placeHolder.png"
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const res = await getTechStack();
        if (res.status !== 200) {
          alert("Something went wrong while fetching skills!");
          setLoading(false);
          return;
        }
        console.log(res.data)
        setSkills(res.data);
      } catch (error) {
        alert("Something went wrong!");
        console.error("Error in fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillClick = async (id) => {
    navigate(`/skills/${id}`);
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="max-w-6xl mx-auto px-6 py-16"
    >
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-2xl text-white">
        <div className="absolute -top-28 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

        <h2 className="text-4xl font-bold text-center mb-10">My Skills</h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading skills...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6  ">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 border border-white/10 backdrop-blur-xl p-5 rounded-xl text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center"
              >
                {/* Icon */}
                <div
                  onClick={() => handleSkillClick(skill._id)}
                  className="mb-4 w-14 h-14 flex items-center justify-center rounded bg-white overflow-hidden">
                  <img
                    src={skill.icon
                      ? `${import.meta.env.VITE_API_BASE_URL}${skill.icon}`
                      : placeHolder
                    }
                    alt={skill.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                {/* Skill Info */}
                <h4 className="font-semibold text-base">{skill.name}</h4>
                <p className="text-xs mt-1 text-gray-200">{skill.category}</p>
                <p className="text-xs text-gray-400 font-medium mt-1">{skill.level}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Skills;
