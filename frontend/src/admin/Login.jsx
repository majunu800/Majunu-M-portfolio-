import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If token exists, redirect straight to dashboard
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiRequest('/auth/login', 'POST', { email, password });
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('adminEmail', data.user.email);
        navigate('/admin/dashboard');
      } else {
        setError('Login failed. Please check credentials.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="glass-panel admin-login-card">
        <h2 className="admin-login-title">Admin Login</h2>
        
        {error && (
          <div className="form-status error" style={{ textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@portfolio.com"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'} <i className="fas fa-sign-in-alt"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
