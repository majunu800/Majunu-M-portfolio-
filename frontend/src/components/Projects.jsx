import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

const DEFAULT_PROJECTS = [
  {
    title: 'Event Management Website',
    description: 'Developed a web-based platform for managing events, registrations, and schedules for a client. Implemented the frontend with HTML, CSS, and JavaScript, and built the backend using Node.js and Express.js with a MySQL database.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MySQL'],
    githubLink: 'https://github.com/majunu800',
    liveLink: '',
    featured: true,
    order: 1
  },
  {
    title: 'Face Detection System',
    description: 'Built a Python-based face detection system using image processing techniques. The project detects human faces in images and demonstrates an understanding of computer vision fundamentals.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    technologies: ['Python', 'OpenCV', 'Computer Vision'],
    githubLink: 'https://github.com/majunu800',
    liveLink: '',
    featured: true,
    order: 2
  },
  {
    title: 'Password Cracking Tool',
    description: 'Developed a password testing tool to explore cybersecurity concepts and ethical hacking. Focused on secure coding principles and security awareness while building core password validation features.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    technologies: ['Python', 'Security', 'Ethical Hacking'],
    githubLink: 'https://github.com/majunu800',
    liveLink: '',
    featured: false,
    order: 3
  }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiRequest('/projects');
        if (response.success && response.data.length > 0) {
          setProjects(response.data);
        } else {
          setProjects(DEFAULT_PROJECTS);
        }
      } catch (err) {
        console.warn('Could not fetch projects from API, using default sample projects.');
        setProjects(DEFAULT_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter categories
  const filters = ['All', 'React', 'Node.js', 'MongoDB', 'Express'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(activeFilter.toLowerCase())
        )
      );

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Showcase</span>
          <h2 className="section-title">My Projects</h2>
        </div>

        <div className="projects-filter">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`tab-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading projects...</div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div key={project._id || index} className="glass-panel project-card">
                <div className="project-image">
                  <img src={project.image || 'https://images.unsplash.com/photo-1580927751497-40247f14d693?auto=format&fit=crop&w=800&q=80'} alt={project.title} />
                  <div className="project-overlay">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link-icon" title="GitHub Repository">
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link-icon" title="Live Demo">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </div>
                </div>

                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="project-tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
