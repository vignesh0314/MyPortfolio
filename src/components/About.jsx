import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <section className="about" id="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <p className="about-summary">
          I'm a passionate and detail-oriented developer currently pursuing my B.Tech in Computer Science at Kalasalingam Academy of Research and Education (CGPA: 7.36, expected graduation 2026). I have a strong interest in web and full-stack development, with a focus on data visualization and AI-powered solutions.
        </p>
        <p className="about-education">
          <strong>Education:</strong> B.Tech in Computer Science and Engineering<br />
          <strong>University:</strong> Kalasalingam Academy of Research and Education, Tamil Nadu<br />
          <strong>Graduation:</strong> Expected 2026
        </p>
      </div>
    </section>
  );
};

export default About;
