import React from "react";
import "../styles/Skills.css";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaBootstrap } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { SiExpress, SiMysql } from "react-icons/si";

const Skills = () => {
    const skills = [
        { name: "HTML", icon: <FaHtml5 />, color: "#E34F26", level: "Expert" },
        { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6", level: "Expert" },
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E", level: "Expert" },
        { name: "React", icon: <FaReact />, color: "#61DAFB", level: "Advanced" },
        { name: "Node.js", icon: <FaNodeJs />, color: "#339933", level: "Advanced" },
        { name: "Express.js", icon: <SiExpress />, color: "#000000", level: "Advanced" }, 
        { name: "MongoDB", icon: <DiMongodb />, color: "#47A248", level: "Intermediate" },
        { name: "Git", icon: <FaGitAlt />, color: "#F05032", level: "Intermediate" },
        { name: "Github", icon: <FaGithub />, color: "#111", level: "Intermediate" },
        { name: "MySQL", icon: <SiMysql />, color: "#4479A1", level: "Intermediate" },
        { name: "Bootstrap", icon: <FaBootstrap />, color: "#7952B3", level: "Expert" },
    ];

    return (
        <section id="skills" className="skills-section text-center py-5">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">
                    My Skills
                </h2>
                <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
                    A closer look at the technologies I excel in.
                </p>

                <div className="row g-4 mt-3">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="col-lg-4 col-md-6 col-sm-12 "
                        data-aos="fade-up"
                        data-aos-delay={100 * index}
                        >
                            <div className="skill-card">
                                <div className="skill-icon" style={{ color: skill.color }}>
                                    {skill.icon}
                                </div>
                                <h4 className="skill-name">{skill.name}</h4>
                                <p className="skill-level">{skill.level}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Skills;
