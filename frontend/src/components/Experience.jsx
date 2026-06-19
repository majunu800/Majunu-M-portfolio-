import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

const DEFAULT_EXPERIENCES = [
  {
    company: 'BaShrithi Campus Technopark',
    role: 'MERN Stack Intern',
    location: 'Nagercoil, India',
    startDate: '2024-01-01',
    current: true,
    description: [
      'Developed and maintained web applications using MongoDB, Express.js, React.js, and Node.js.',
      'Collaborated with teammates to design responsive and user-friendly interfaces.',
      'Worked with Git and GitHub for version control and project management.'
    ]
  }
];

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await apiRequest('/experience');
        if (response.success && response.data.length > 0) {
          setExperiences(response.data);
        } else {
          setExperiences(DEFAULT_EXPERIENCES);
        }
      } catch (err) {
        console.warn('Could not fetch experiences from API, using default sample experiences.');
        setExperiences(DEFAULT_EXPERIENCES);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const formatDate = (dateStr, isCurrent) => {
    if (isCurrent) return 'Present';
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">My Journey</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading experiences...</div>
        ) : (
          <div className="timeline-container">
            {experiences.map((exp, index) => (
              <div key={exp._id || index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="glass-panel timeline-card">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <h4 className="timeline-org">
                        {exp.company} {exp.location ? `| ${exp.location}` : ''}
                      </h4>
                    </div>
                    <span className="timeline-date">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="timeline-desc">
                    <ul>
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
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

export default Experience;
