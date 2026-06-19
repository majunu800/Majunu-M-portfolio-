import React from 'react';

const Hero = () => {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="hero-greeting">WELCOME TO MY WORLD</span>
          <h1 className="hero-title">
            Hi, I'm <span className="hero-name">Majunu M</span><span className="hero-cursor" aria-hidden="true"></span>
          </h1>
          <h2 className="hero-subtitle">MERN Stack Intern / Full Stack Developer</h2>
          <p className="hero-desc">
            I build responsive MERN applications and Python-powered tools, focused on user-first interfaces and scalable backend systems. I am committed to solving real problems with clean, maintainable code.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary" onClick={handleScrollToProjects}>
              View My Work <i className="fas fa-arrow-right"></i>
            </a>
            <a href="/resume.pdf" download className="btn btn-secondary">
              Download Resume <i className="fas fa-download"></i>
            </a>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          <div className="hero-blob">
            <img
              src="/profile.jpg"
              alt="Majunu M Profile"
              onError={(e) => { e.target.onerror = null; e.target.src = '/profile-alt.jpg'; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
