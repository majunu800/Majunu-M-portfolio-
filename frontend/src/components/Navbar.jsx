import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Highlight active section on scroll
      if (!isAdmin) {
        const sections = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'contact'];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdmin]);

  const handleNavClick = (sectionId) => {
    setMenuActive(false);
    if (isAdmin) {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }
  };

  useEffect(() => {
    if (!isAdmin && location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(location.state.scrollTo);
        }
        // Clear state so it doesn't trigger again
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
    }
  }, [location, isAdmin, navigate]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={() => handleNavClick('home')}>
          Majunu<span>.</span>
        </Link>

        {/* Desktop and Mobile Menu */}
        {!isAdmin ? (
          <nav className={`nav-menu ${menuActive ? 'active' : ''}`}>
            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a>
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a>
            <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}>Skills</a>
            <a href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }}>Experience</a>
            <a href="#education" className={`nav-link ${activeSection === 'education' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('education'); }}>Education</a>
            <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>Projects</a>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a>
            <Link to="/admin" className="nav-link" onClick={() => setMenuActive(false)}>Admin</Link>
          </nav>
        ) : (
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Back To Site</Link>
          </nav>
        )}

        <button className="nav-toggle" onClick={() => setMenuActive(!menuActive)}>
          <i className={menuActive ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
