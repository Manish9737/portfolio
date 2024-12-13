import React from "react";
import "../styles/About.css";
import profileImage from "../images/profile.JPG";

const About = () => {
    return (
        <div className="about-me-page">
            <div className="container py-5">
                <div className="row align-items-center">
                    {/* Profile Image */}
                    <div className="col-md-4 text-center" data-aos="fade-right">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="profile-image img-fluid rounded-circle shadow-lg"
                        />
                    </div>

                    {/* About Me Content */}
                    <div className="col-md-8" data-aos="fade-left">
                        <h2 className="section-title">About Me</h2>
                        <p className="about-description">
                            Hi! I am Manishkumar Kumavat, a passionate Full Stack Developer
                            specializing in creating dynamic and responsive web applications.
                            I have experience in the MERN stack and a strong foundation in
                            designing user-friendly interfaces.
                        </p>
                        <p className="about-description">
                            My goal is to bring ideas to life through innovative solutions
                            while ensuring seamless user experiences. With a keen eye for
                            detail and a commitment to excellence, I am ready to contribute
                            to meaningful projects.
                        </p>
                        {/* <div className="additional-info" data-aos="fade-up">
                            <h4>Contact Information</h4>
                            <p><strong>Full Name:</strong> Manishkumar Kumavat</p>
                            <p><strong>Mobile Number:</strong> 9737982616</p>
                            <p><strong>Location:</strong> Ahmedabad, India</p>
                            <p><strong>Profession:</strong> Full Stack Developer (MERN Stack)</p>
                        </div> */}
                        <div className="skills">
                            <h4>Core Skills:</h4>
                            <ul>
                                <li>JavaScript (React.js, Node.js)</li>
                                <li>HTML, CSS, and Responsive Design</li>
                                <li>MongoDB, Express.js</li>
                                <li>Git and Version Control</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
