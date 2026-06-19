import React, { useState } from 'react';
import { apiRequest } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const { name, email, subject, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ type: 'error', message: 'Please fill out all required fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await apiRequest('/messages', 'POST', formData);
      if (response.success) {
        setStatus({ type: 'success', message: 'Thank you! Your message was sent successfully.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: response.error || 'Failed to send message.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to connect to server. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ paddingBottom: '100px' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Let's discuss your project</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Feel free to send a message! I'm always open to new opportunities, collaborations, or discussing projects of interest.
            </p>

            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <div className="contact-label">Email Me</div>
                <div className="contact-value">majunu390@gmail.com</div>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div>
                <div className="contact-label">Call Me</div>
                <div className="contact-value">+91 87786 51246</div>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <div className="contact-label">Location</div>
                <div className="contact-value">Nagercoil, India</div>
              </div>
            </div>
          </div>

          <div className="glass-panel contact-form">
            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'} <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
