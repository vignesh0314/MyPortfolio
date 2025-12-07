import React from 'react';
import '../styles/footer.css';
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-icons">
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Vignesh. All rights reserved.</p>
      </div>
      <div className="scroll-top" onClick={scrollToTop}>
        <FaArrowUp />
      </div>
    </footer>
  );
};

export default Footer;
