import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CursorDots from './components/CursorDots';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Import Admin Views
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';

// Main Portfolio Page Layout
const PortfolioMain = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

// Protected Route check helper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <Router>
      <CursorDots count={12} />
      {/* Dynamic Background Glow Blobs */}
      <div className="bg-glow-container">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
      </div>

      <Routes>
        {/* Public Portfolio Route */}
        <Route path="/" element={<PortfolioMain />} />

        {/* Admin Login Route */}
        <Route path="/admin" element={
          <>
            <Navbar />
            <Login />
          </>
        } />

        {/* Protected Admin Dashboard Route */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Redirect unknown routes back to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
