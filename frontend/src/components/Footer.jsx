import { Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { getGmailComposeUrl } from '../utils/emailLinks';

const Footer = () => {
  const { personalInfo } = portfolioData;
  const emailComposeUrl = getGmailComposeUrl(personalInfo.socials.email);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const el = document.getElementById(targetId);
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-bg-darker border-t border-white/5 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Brand */}
        <div className="space-y-2">
          <h4 className="text-lg font-display font-extrabold tracking-wider text-white uppercase">
            MAJUNU <span className="text-primary">M</span>
          </h4>
          <p className="text-xs text-text-muted font-sans font-medium">
            B.Tech Computer Science Student | Full-Stack Developer
          </p>
        </div>

        {/* Quick Links */}
        <ul className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {quickLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Social Icons & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/15 transition-all duration-200 flex items-center justify-center w-8 h-8"
              title="GitHub"
            >
              <i className="fab fa-github text-sm"></i>
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/15 transition-all duration-200 flex items-center justify-center w-8 h-8"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin-in text-sm"></i>
            </a>
            <a
              href={emailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/15 transition-all duration-200 flex items-center justify-center w-8 h-8"
              title="Email"
            >
              <Mail size={14} />
            </a>
          </div>
          <span className="text-[11px] text-text-muted font-sans">
            &copy; {new Date().getFullYear()} Majunu M. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
