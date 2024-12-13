import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import "../styles/Projects.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const projectData = [
    {
      title: "Playways",
      description: "Playways is the platform where players can book slots for their fav game at their fav. gaming ground. It’s built with React and Node.js.",
      techStack: ["React", "Node.js", "MongoDB", "Express.js"],
      imageUrl: require("../images/Logo1.jpg"),
      githubLink: "https://github.com/Manish9737/Playways-backup/",
      liveLink: "https://playways-app.web.app/",
    },
    {
      title: "Cafe-Mania",
      description: "This is another project. It’s built with HTML, CSS, and JavaScript.",
      techStack: ["React", "Node.js", "MongoDB", "Express.js"],
      imageUrl: require("../images/CafeMania.png"),
      githubLink: "https://github.com/Manish9737/Cafe-mania/",
      liveLink: "https://cafe-mania-c9a90.web.app/",
    },
    {
      title: "LinkToQr",
      description: "This is another project. It’s built with HTML, CSS, and JavaScript.",
      techStack: ["HTML", "CSS", "JavaScript"],
      imageUrl: require("../images/LinkToQr.png"),
      githubLink: "https://github.com/Manish9737/LinkToQr/",
      liveLink: "http://manish9737.github.io/LinkToQr/",
    },
    {
      title: "Snipster",
      description: "This is another project. It’s built with HTML, CSS, and JavaScript.",
      techStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js"],
      imageUrl: require("../images/Snipster.png"),
      githubLink: "https://github.com/Manish9737/snipster/",
      liveLink: "http://manish9737.github.io/snipster/",
    },
    {
      title: "Job-Portal Server",
      description: "This is another project. It’s built with Node.js, Express.js and MySql.",
      techStack: ["Node.js", "Express.js", "MySql"],
      imageUrl: require("../images/neMysql.png"),
      githubLink: "https://github.com/Manish9737/job-portal/",
      // liveLink: "http://manish9737.github.io/snipster/",
    },
  ];

  return (
    <div className="projects-page">
      {/* Projects Section */}
      <section className="projects-section" id="projects">
        <div className="container">
          <h2 className="text-center" data-aos="fade-up">
            My Projects
          </h2>
          <div className="row justify-content-center text-center">
            {projectData.map((project, index) => (
              <div
                key={index}
                className="col-md-4 project-card"
                data-aos="flip-left"
                data-aos-delay={index * 200}
              >
                <div className="card h-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-description">{project.description}</p>
                    <div className="tech-stack">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="tech">{tech}</span>
                      ))}
                    </div>
                    <div className="card-links">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                          <FaGithub /> GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
