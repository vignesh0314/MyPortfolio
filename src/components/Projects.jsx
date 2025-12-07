import React from 'react';
import '../styles/projects.css';

const projects = [
  {
    title: 'Personal Portfolio',
    description: 'Responsive portfolio website to showcase skills and resume.',
    tech: ['React', 'CSS', 'React Icons'],
    link: 'http://localhost:3000/VigneshPortfolio#projects',
    code:'',
  },
  {
    title: 'Campus Food Ordering System',
    description: 'Full-stack web app for canteen food ordering built with Flask.',
    tech: ['Python', 'Flask', 'MySQL'],
    link: 'https://kare-food-ordering.onrender.com',
    button:'',
  },
  {
    title: 'Money Manager App',
    description: 'Mobile app to track income/expenses built with React Native.',
    tech: ['React Native', 'Django', 'SQLite'],
    link: '',
    button:'OnGoing',
  },
  {
    title: 'KARE_Slots',
    description: 'Full-stack web application for Students Slot Booking.',
    tech: ['HTML','CSS','PHP','MySQL'],
    link: 'http://kareslots.infinityfreeapp.com/',
    code:'',
  }
];

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((proj, index) => (
          <div className="project-card" key={index}>
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <div className="tech-tags">
              {proj.tech.map((t, i) => (
                <span key={i} className="tag">{t}</span>
              ))}
            </div>
            <div className="project-links">
              {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer">Link</a>}
              {proj.button && <a href={proj.button} target="_blank" rel="noopener noreferrer">OnGoing</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
