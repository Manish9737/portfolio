import React from "react";

const ProjectCard = ({ project }) => (
    <div className="project-card">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.image && <img src={project.image} alt={project.title} />}
        <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
    </div>
);

export default ProjectCard;
