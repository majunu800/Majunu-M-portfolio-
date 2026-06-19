import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/api';

const DEFAULT_SKILLS = [
  { name: 'React.js', category: 'Frontend', level: 85, icon: 'fab fa-react' },
  { name: 'JavaScript', category: 'Frontend', level: 90, icon: 'fab fa-js' },
  { name: 'HTML & CSS', category: 'Frontend', level: 88, icon: 'fab fa-html5' },
  { name: 'Node.js', category: 'Backend', level: 84, icon: 'fab fa-node-js' },
  { name: 'Express.js', category: 'Backend', level: 82, icon: 'fas fa-server' },
  { name: 'MongoDB', category: 'Database', level: 80, icon: 'fas fa-database' },
  { name: 'Python', category: 'Backend', level: 82, icon: 'fab fa-python' },
  { name: 'Git & GitHub', category: 'Tools', level: 90, icon: 'fab fa-github' }
];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await apiRequest('/skills');
        if (response.success && response.data.length > 0) {
          setSkills(response.data);
        } else {
          setSkills(DEFAULT_SKILLS);
        }
      } catch (err) {
        console.warn('Could not fetch skills from API, using default sample skills.');
        setSkills(DEFAULT_SKILLS);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Proficiencies</span>
          <h2 className="section-title">My Skills</h2>
        </div>

        <div className="skills-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading skills...</div>
        ) : (
          <div className="skills-grid">
            {filteredSkills.map((skill, index) => (
              <div key={skill._id || index} className="glass-panel skill-card">
                <div className="skill-info">
                  <div className="skill-icon">
                    <i className={skill.icon || 'fas fa-code'}></i>
                  </div>
                  <div>
                    <h3 className="skill-name">{skill.name}</h3>
                    <span className="badge" style={{ marginTop: '4px', fontSize: '10px' }}>{skill.category}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <div className="skill-level-container" style={{ width: '80%' }}>
                    <div 
                      className="skill-level-fill" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="skill-level-pct">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
