import React from 'react';
import '../styles/certifications.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

const certifications = [
  {
    title: 'Data Visualisation : Empowering Business with Effective Insights',
    issuer: 'Forage',
    date: 'July 2025',
    link: 'https://www.linkedin.com/posts/vignesh-m-63b675268_forage-certificate-activity-7355848232532414467-DD5j?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEGYJE8BOQzmL3XgMXbw3k-PUx0YqZW4PbI'
  },
  {
    title: 'Power BI Workshop',
    issuer: 'OfficeMaster',
    date: 'July 2025',
    link: 'https://www.linkedin.com/posts/vignesh-m-63b675268_powerbi-dataanalytics-dashboarddesign-activity-7352913422671384576-CAhG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEGYJE8BOQzmL3XgMXbw3k-PUx0YqZW4PbI'
  },
  {
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte',
    date: 'July 2025',
    link: 'https://www.linkedin.com/posts/vignesh-m-63b675268_deloitte-dataanalytics-forage-activity-7350184052051623936-5_9V?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEGYJE8BOQzmL3XgMXbw3k-PUx0YqZW4PbI'
  },
  {
    title: 'JavaScript for Beginners',
    issuer: 'SimpliLearn',
    date: 'July 2025',
    link: 'https://www.linkedin.com/posts/vignesh-m-63b675268_javascript-webdevelopment-learningjourney-activity-7355970427266981889-mbiR?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEGYJE8BOQzmL3XgMXbw3k-PUx0YqZW4PbI'
  }
];

const Certifications = () => {
  return (
    <section className="certifications" id="certifications">
      <h2 className="section-title">Certifications</h2>
      <div className="cert-cards">
        {certifications.map((cert, index) => (
          <div className="cert-glass-card" key={index}>
            <div className="cert-content">
              <span className="cert-issuer">{cert.issuer}</span>
              <h3>{cert.title}</h3>
              <p className="cert-date">{cert.date}</p>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-view-btn">
                View <FaExternalLinkAlt />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
