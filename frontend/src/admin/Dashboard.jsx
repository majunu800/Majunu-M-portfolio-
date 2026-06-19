import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null); // null means Add mode, object means Edit mode
  const [statusMsg, setStatusMsg] = useState('');
  const navigate = useNavigate();

  // Form states
  const [projectForm, setProjectForm] = useState({ title: '', description: '', image: '', technologies: '', githubLink: '', liveLink: '', featured: false, order: 0 });
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend', level: 80, icon: '' });
  const [expForm, setExpForm] = useState({ company: '', role: '', location: '', startDate: '', endDate: '', current: false, description: '' });
  const [eduForm, setEduForm] = useState({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', current: false, description: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin');
    } else {
      fetchItems();
    }
  }, [activeTab, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminEmail');
    navigate('/admin');
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      let endpoint = `/${activeTab}`;
      const res = await apiRequest(endpoint);
      if (res.success) {
        setItems(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch data for admin dashboard', err);
      // Fallback empty list
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete Action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await apiRequest(`/${activeTab}/${id}`, 'DELETE');
        setStatusMsg('Deleted successfully');
        fetchItems();
      } catch (err) {
        setStatusMsg(err.message || 'Delete operation failed');
      }
    }
  };

  // Modal open for Create
  const handleOpenAdd = () => {
    setEditItem(null);
    // Reset forms
    setProjectForm({ title: '', description: '', image: '', technologies: '', githubLink: '', liveLink: '', featured: false, order: 0 });
    setSkillForm({ name: '', category: 'Frontend', level: 80, icon: '' });
    setExpForm({ company: '', role: '', location: '', startDate: '', endDate: '', current: false, description: '' });
    setEduForm({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', current: false, description: '' });
    setShowModal(true);
  };

  // Modal open for Edit
  const handleOpenEdit = (item) => {
    setEditItem(item);
    
    // Fill specific forms based on tab
    if (activeTab === 'projects') {
      setProjectForm({
        title: item.title || '',
        description: item.description || '',
        image: item.image || '',
        technologies: item.technologies ? item.technologies.join(', ') : '',
        githubLink: item.githubLink || '',
        liveLink: item.liveLink || '',
        featured: item.featured || false,
        order: item.order || 0
      });
    } else if (activeTab === 'skills') {
      setSkillForm({
        name: item.name || '',
        category: item.category || 'Frontend',
        level: item.level || 80,
        icon: item.icon || ''
      });
    } else if (activeTab === 'experience') {
      setExpForm({
        company: item.company || '',
        role: item.role || '',
        location: item.location || '',
        startDate: item.startDate ? item.startDate.split('T')[0] : '',
        endDate: item.endDate ? item.endDate.split('T')[0] : '',
        current: item.current || false,
        description: item.description ? item.description.join('\n') : ''
      });
    } else if (activeTab === 'education') {
      setEduForm({
        institution: item.institution || '',
        degree: item.degree || '',
        fieldOfStudy: item.fieldOfStudy || '',
        startDate: item.startDate ? item.startDate.split('T')[0] : '',
        endDate: item.endDate ? item.endDate.split('T')[0] : '',
        current: item.current || false,
        description: item.description || ''
      });
    }
    setShowModal(true);
  };

  // Submit Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let body = {};
    
    if (activeTab === 'projects') {
      body = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(tech => tech.trim()).filter(Boolean)
      };
    } else if (activeTab === 'skills') {
      body = skillForm;
    } else if (activeTab === 'experience') {
      body = {
        ...expForm,
        description: expForm.description.split('\n').map(bullet => bullet.trim()).filter(Boolean)
      };
    } else if (activeTab === 'education') {
      body = eduForm;
    }

    try {
      if (editItem) {
        // Edit Mode
        await apiRequest(`/${activeTab}/${editItem._id}`, 'PUT', body);
        setStatusMsg('Updated successfully');
      } else {
        // Create Mode
        await apiRequest(`/${activeTab}`, 'POST', body);
        setStatusMsg('Created successfully');
      }
      setShowModal(false);
      fetchItems();
    } catch (err) {
      setStatusMsg(err.message || 'Operation failed');
    }
  };

  const handleMessageRead = async (id) => {
    try {
      await apiRequest(`/messages/${id}/read`, 'PUT');
      setStatusMsg('Marked as read');
      fetchItems();
    } catch (err) {
      setStatusMsg(err.message || 'Failed to mark as read');
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div>
          <h2 className="logo" style={{ marginBottom: '40px' }}>Admin<span>.</span></h2>
          <ul className="admin-sidebar-menu">
            <li className="admin-sidebar-item">
              <button 
                className={`admin-sidebar-link ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <i className="fas fa-project-diagram"></i> Projects
              </button>
            </li>
            <li className="admin-sidebar-item">
              <button 
                className={`admin-sidebar-link ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <i className="fas fa-brain"></i> Skills
              </button>
            </li>
            <li className="admin-sidebar-item">
              <button 
                className={`admin-sidebar-link ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                <i className="fas fa-briefcase"></i> Experience
              </button>
            </li>
            <li className="admin-sidebar-item">
              <button 
                className={`admin-sidebar-link ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <i className="fas fa-graduation-cap"></i> Education
              </button>
            </li>
            <li className="admin-sidebar-item">
              <button 
                className={`admin-sidebar-link ${activeTab === 'messages' ? 'active' : ''}`}
                onClick={() => setActiveTab('messages')}
              >
                <i className="fas fa-envelope"></i> Messages
              </button>
            </li>
          </ul>
        </div>
        
        <button className="btn btn-secondary" style={{ marginTop: 'auto', width: '100%' }} onClick={handleLogout}>
          Logout <i className="fas fa-sign-out-alt"></i>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <div className="admin-header">
          <h1 className="admin-title">Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          {activeTab !== 'messages' && (
            <button className="btn btn-primary" onClick={handleOpenAdd}>
              Add New <i className="fas fa-plus"></i>
            </button>
          )}
        </div>

        <div className="glass-panel admin-card">
          {statusMsg && (
            <div style={{ padding: '12px 16px', marginBottom: 12, borderRadius: 8, background: 'linear-gradient(90deg,#0f172a,#071033)', color: 'var(--text-primary)', boxShadow: '0 6px 20px rgba(2,6,23,0.6)' }}>
              {statusMsg}
              <button style={{ float: 'right', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setStatusMsg('')}>×</button>
            </div>
          )}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading data...</div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>No items found. Add some to get started!</div>
          ) : (
            <div className="admin-table-wrapper">
              {/* Projects Tab Table */}
              {activeTab === 'projects' && (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Featured</th>
                      <th>Order</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id}>
                        <td><strong>{item.title}</strong></td>
                        <td>{item.featured ? 'Yes' : 'No'}</td>
                        <td>{item.order}</td>
                        <td className="admin-actions">
                          <button className="btn-icon btn-edit" onClick={() => handleOpenEdit(item)}><i className="fas fa-edit"></i></button>
                          <button className="btn-icon btn-delete" onClick={() => handleDelete(item._id)}><i className="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Skills Tab Table */}
              {activeTab === 'skills' && (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Level</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id}>
                        <td><strong>{item.name}</strong></td>
                        <td><span className="badge">{item.category}</span></td>
                        <td>{item.level}%</td>
                        <td className="admin-actions">
                          <button className="btn-icon btn-edit" onClick={() => handleOpenEdit(item)}><i className="fas fa-edit"></i></button>
                          <button className="btn-icon btn-delete" onClick={() => handleDelete(item._id)}><i className="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Experience Tab Table */}
              {activeTab === 'experience' && (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Date Range</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id}>
                        <td><strong>{item.company}</strong></td>
                        <td>{item.role}</td>
                        <td>
                          {new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                          {item.current ? ' Present' : ` ${new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                        </td>
                        <td className="admin-actions">
                          <button className="btn-icon btn-edit" onClick={() => handleOpenEdit(item)}><i className="fas fa-edit"></i></button>
                          <button className="btn-icon btn-delete" onClick={() => handleDelete(item._id)}><i className="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Education Tab Table */}
              {activeTab === 'education' && (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Institution</th>
                      <th>Degree</th>
                      <th>Date Range</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id}>
                        <td><strong>{item.institution}</strong></td>
                        <td>{item.degree}</td>
                        <td>
                          {new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                          {item.current ? ' Present' : ` ${new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                        </td>
                        <td className="admin-actions">
                          <button className="btn-icon btn-edit" onClick={() => handleOpenEdit(item)}><i className="fas fa-edit"></i></button>
                          <button className="btn-icon btn-delete" onClick={() => handleDelete(item._id)}><i className="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Messages Tab Table */}
              {activeTab === 'messages' && (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id} style={!item.read ? { backgroundColor: 'rgba(99, 102, 241, 0.05)' } : {}}>
                        <td>
                          <strong>{item.name}</strong><br />
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.email}</span>
                        </td>
                        <td>{item.subject}</td>
                        <td><p style={{ maxWidth: '300px', whiteSpace: 'normal' }}>{item.message}</p></td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="admin-actions">
                          {!item.read && (
                            <button className="btn-icon btn-edit" title="Mark as Read" onClick={() => handleMessageRead(item._id)}>
                              <i className="fas fa-check"></i>
                            </button>
                          )}
                          <button className="btn-icon btn-delete" title="Delete message" onClick={() => handleDelete(item._id)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Editor Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{editItem ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleFormSubmit}>
              {/* Project Editor Form */}
              {activeTab === 'projects' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-control"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Technologies (comma separated) *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                      placeholder="React, Express, MongoDB"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">GitHub Link</label>
                      <input
                        type="text"
                        className="form-control"
                        value={projectForm.githubLink}
                        onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Live Link</label>
                      <input
                        type="text"
                        className="form-control"
                        value={projectForm.liveLink}
                        onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Sort Order</label>
                      <input
                        type="number"
                        className="form-control"
                        value={projectForm.order}
                        onChange={(e) => setProjectForm({ ...projectForm, order: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', height: '100%', marginTop: '30px' }}>
                      <input
                        type="checkbox"
                        id="featured"
                        checked={projectForm.featured}
                        onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                        style={{ marginRight: '10px', width: '20px', height: '20px' }}
                      />
                      <label htmlFor="featured" className="form-label" style={{ margin: 0 }}>Featured Project</label>
                    </div>
                  </div>
                </>
              )}

              {/* Skill Editor Form */}
              {activeTab === 'skills' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Category *</label>
                      <select
                        className="form-control"
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                        required
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="Tools">Tools</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Level (0 - 100) *</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="form-control"
                        value={skillForm.level}
                        onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) || 80 })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Icon Class (FontAwesome, e.g. fab fa-react)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={skillForm.icon}
                      onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
                      placeholder="fab fa-react"
                    />
                  </div>
                </>
              )}

              {/* Experience Editor Form */}
              {activeTab === 'experience' && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Company Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={expForm.company}
                        onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Role / Position *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={expForm.role}
                        onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={expForm.location}
                      onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                      placeholder="City, State / Remote"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Start Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={expForm.startDate}
                        onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={expForm.endDate}
                        onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                        disabled={expForm.current}
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <input
                      type="checkbox"
                      id="expCurrent"
                      checked={expForm.current}
                      onChange={(e) => setExpForm({ ...expForm, current: e.target.checked })}
                      style={{ marginRight: '10px', width: '20px', height: '20px' }}
                    />
                    <label htmlFor="expCurrent" className="form-label" style={{ margin: 0 }}>Currently Working Here</label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description Accomplishments (one per line) *</label>
                    <textarea
                      className="form-control"
                      value={expForm.description}
                      onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                      rows="5"
                      placeholder="Implemented X using Y&#10;Reduced Z by 20%"
                      required
                    ></textarea>
                  </div>
                </>
              )}

              {/* Education Editor Form */}
              {activeTab === 'education' && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Institution Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={eduForm.institution}
                        onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Degree *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={eduForm.degree}
                        onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Field of Study</label>
                    <input
                      type="text"
                      className="form-control"
                      value={eduForm.fieldOfStudy}
                      onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Start Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={eduForm.startDate}
                        onChange={(e) => setEduForm({ ...eduForm, startDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={eduForm.endDate}
                        onChange={(e) => setEduForm({ ...eduForm, endDate: e.target.value })}
                        disabled={eduForm.current}
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <input
                      type="checkbox"
                      id="eduCurrent"
                      checked={eduForm.current}
                      onChange={(e) => setEduForm({ ...eduForm, current: e.target.checked })}
                      style={{ marginRight: '10px', width: '20px', height: '20px' }}
                    />
                    <label htmlFor="eduCurrent" className="form-label" style={{ margin: 0 }}>Currently Enrolled Here</label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={eduForm.description}
                      onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                      placeholder="Graduated with honors, specialized in web systems."
                    ></textarea>
                  </div>
                </>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
