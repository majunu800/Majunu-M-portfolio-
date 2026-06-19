const API_BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const options = {
    method,
    headers: getHeaders()
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    // Try parse JSON safely
    let data = null;
    try { data = await response.json(); } catch (err) { data = null; }

    if (!response.ok) {
      // Auto-handle unauthorized: clear token and redirect to admin login
      if (response.status === 401) {
        localStorage.removeItem('token');
        // Redirect to admin login
        if (typeof window !== 'undefined') window.location.href = '/admin';
        throw new Error('Unauthorized');
      }
      throw new Error((data && (data.error || data.message)) || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error.message);
    throw error;
  }
};
