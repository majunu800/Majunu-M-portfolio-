import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

const DEFAULT_EDUCATION = [
  {
    institution: 'Amrita Vishwa Vidyapeetham, Nagercoil',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    fieldOfStudy: '',
    startDate: '2024-08-01',
    endDate: '2028-05-30',
    current: true,
    description: 'Pursuing a B.Tech degree with a focus on software development, MERN stack applications, and web technologies.'
  },
  {
    institution: 'CSC Computer Software College',
    degree: 'Honours Diploma in Computer Application (HDCA)',
    fieldOfStudy: '',
    startDate: '2023-07-01',
    endDate: '2024-07-31',
    current: false,
    description: 'Completed HDCA with Grade B and gained a strong foundation in computer applications and programming.'
  }
];

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await apiRequest('/education');
        if (response.success && response.data.length > 0) {
          setEducationList(response.data);
        } else {
          setEducationList(DEFAULT_EDUCATION);
        }
      } catch (err) {
        console.warn('Could not fetch education from API, using default sample education.');
        setEducationList(DEFAULT_EDUCATION);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  const formatDate = (dateStr, isCurrent) => {
    if (isCurrent) return 'Present';
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Academic Background</span>
          <h2 className="section-title">My Education</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading education...</div>
        ) : (
          <div className="timeline-container">
            {educationList.map((edu, index) => (
              <div key={edu._id || index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="glass-panel timeline-card">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{edu.degree}</h3>
                      <h4 className="timeline-org">
                        {edu.institution} {edu.fieldOfStudy ? `| ${edu.fieldOfStudy}` : ''}
                      </h4>
                    </div>
                    <span className="timeline-date">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate, edu.current)}
                    </span>
                  </div>
                  {edu.description && (
                    <div className="timeline-desc">
                      <p>{edu.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;
