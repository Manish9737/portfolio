import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { FaCode, FaRocket, FaUsers, FaEnvelope } from "react-icons/fa";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import Skills from "../components/Skills";
import DownloadResume from "../components/DownloadResume"; // Import DownloadResume component

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <div className="container">
          <h1 className="hero-title" data-aos="fade-up">
            Welcome to <span>My Portfolio</span>
          </h1>
          <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
            A showcase of creativity, innovation, and skills.
          </p>
          
          <DownloadResume />
          
          <Link to="/projects" id="link-button" className="btn btn-primary" data-aos="fade-up" data-aos-delay="200">
            Explore Projects
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section text-center" id="about">
        <div className="container" data-aos="fade-right">
          <h2>About Me</h2>
          <p>
            I am Manishkumar Kumavat, a passionate <span>MERN Stack developer</span> with expertise in creating beautiful,
            responsive, and functional web applications. With a strong eye for design and a focus on user
            experience, I aim to deliver solutions that make an impact. Let's work together to build something great!
          </p>
        </div>
      </section>

      {/* Skills section */}
      <section>
        <div className="" data-aos="fade-up">
          <Skills />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="container">
          <h2 className="text-center" data-aos="fade-up">
            Features
          </h2>
          <div className="row text-center">
            <div className="col-md-4" data-aos="flip-left">
              <FaCode className="feature-icon" />
              <h3>Clean Code</h3>
              <p>Writing maintainable and scalable code is my priority.</p>
            </div>
            <div className="col-md-4" data-aos="flip-left" data-aos-delay="200">
              <FaRocket className="feature-icon" />
              <h3>Performance</h3>
              <p>Optimized applications with lightning-fast performance.</p>
            </div>
            <div className="col-md-4" data-aos="flip-left" data-aos-delay="400">
              <FaUsers className="feature-icon" />
              <h3>Collaboration</h3>
              <p>Working with teams to deliver outstanding results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section text-center" id="contact">
        <div className="container" data-aos="fade-up">
          <h2>Contact Me</h2>
          <p>Feel free to get in touch to discuss your projects or ideas. I'm always open to new opportunities!</p>
          <Link to={'/contact'} className="btn btn-secondary link-btn" >
            <FaEnvelope /> Send a Message
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
