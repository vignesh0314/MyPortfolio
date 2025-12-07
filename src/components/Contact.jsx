import React from 'react';
import '../styles/contact.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Contact Me</h2>
      
      <p className="contact-intro">
        Let's connect! You can reach out through the form or on social platforms.
      </p>

      <div className="contact-wrapper">
        {/* Contact Form */}

        {/* Social Media Links */}
        <div className="contact-social">
          <a href="https://github.com/vignesh0314" target="_blank" rel="noopener noreferrer">
            <FaGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/vignesh-m-63b675268/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
          <a href="vigneshm030105@gmail.com">
            <FaEnvelope /> Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
