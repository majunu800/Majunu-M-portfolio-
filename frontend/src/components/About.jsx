import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Discover</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          <div className="about-image-side">
            <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-md)', display: 'inline-block' }}>
              <img 
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80" 
                alt="Workspace / coding background" 
                style={{ width: '100%', borderRadius: 'var(--radius-sm)', display: 'block', maxHeight: '350px', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="about-details">
            <h3 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--primary)' }}>
              I create practical web solutions with MERN and Python.
            </h3>
            <p className="about-p">
              I am a B.Tech Computer Science student with hands-on experience in full-stack web development using MongoDB, Express.js, React.js, Node.js, and Python. I enjoy building responsive applications that solve real-world problems.
            </p>
            <p className="about-p">
              My approach combines clean frontend design, strong backend APIs, and collaboration through GitHub. I am focused on continuous learning and contributing to innovative software projects.
            </p>

            <div className="about-stats">
              <div className="glass-panel stat-card">
                <div className="stat-number">1+</div>
                <div className="stat-label">MERN Internship</div>
              </div>
              <div className="glass-panel stat-card">
                <div className="stat-number">5+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="glass-panel stat-card">
                <div className="stat-number">90%</div>
                <div className="stat-label">Git & Collaboration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
