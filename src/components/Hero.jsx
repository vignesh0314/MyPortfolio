import React from 'react';
import '../styles/hero.css';
import profileImg from '../assets/My_Photo.jpg';
import cognizantLogo from '../assets/Cognizant_Logo.jpg';
import { FaReact, FaPython, FaJs, FaNodeJs, FaGitAlt } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero" id="home">
      {/* Animated Icon Background */}
      <div className="hero-icons-bg">
        <FaReact className="hero-icon react" />
        <FaPython className="hero-icon python" />
        <FaJs className="hero-icon js" />
        <FaNodeJs className="hero-icon node" />
        <FaGitAlt className="hero-icon git" />
      </div>

      {/* Content */}
      <div className="hero-content">
        <img src={profileImg} alt="Vignesh" className="profile-img" />
        <h1 className="hero-title">Hi, I'm Vignesh M 👋</h1>

        {/* Subtitle with logo before Cognizant */}
        <p className="hero-subtitle">
          Programmer Analyst Trainee @Cognizant
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn">View Projects</a>
          <a href="/vignesh_cv.pdf" download className="btn btn-outline">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
