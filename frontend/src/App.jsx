import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SplashCursor from './components/SplashCursor';
import About from './components/About';
import WhatIBuild from './components/WhatIBuild';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import CareerObjective from './components/CareerObjective';
import ProfessionalJourney from './components/ProfessionalJourney';
import WhyWorkWithMe from './components/WhyWorkWithMe';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Import Admin Views (kept for backend compatibility)
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';

// Main Portfolio Page Layout
const PortfolioMain = () => {
  return (
    <div className="relative bg-bg-darker min-h-screen text-text-primary selection:bg-primary/30 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <WhatIBuild />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <CareerObjective />
      <ProfessionalJourney />
      <WhyWorkWithMe />
      <Contact />
      <Footer />
    </div>
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
      <SplashCursor
        rainbow={false}
        size={1}
        force={1}
        swirl={3}
        trail={1}
        clickSplash
        colorSpeed={1}
        intensity={1}
        momentum={1}
        shading={1}
        glow={0}
        quality="high"
        intro
        contained={false}
      />
      
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
          <div className="bg-bg-darker min-h-screen text-text-primary">
            <Navbar />
            <Login />
          </div>
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
