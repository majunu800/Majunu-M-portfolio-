import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-links">
          <a href="https://github.com/majunu800" target="_blank" rel="noopener noreferrer" className="footer-link" title="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/majunu-m-313656359" target="_blank" rel="noopener noreferrer" className="footer-link" title="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:majunu390@gmail.com" className="footer-link" title="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Majunu M. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
