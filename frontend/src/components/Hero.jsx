import { Mail, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { getGmailComposeUrl } from '../utils/emailLinks';

const Hero = () => {
  const { personalInfo } = portfolioData;
  const emailComposeUrl = getGmailComposeUrl(personalInfo.socials.email);

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-bg-darker grid-bg"
    >
      {/* Glow effects */}
      <div className="absolute top-[10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left: Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide text-text-secondary uppercase">
              Open for Internships & Collaboration
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-4 leading-tight"
          >
            Hi, I'm <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{personalInfo.name}</span>
          </motion.h1>

          <motion.h2 
            variants={itemVariants}
            className="text-lg sm:text-2xl font-display font-semibold text-text-secondary mb-6 tracking-wide"
          >
            {personalInfo.title}
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-text-secondary mb-8 max-w-xl leading-relaxed font-sans"
          >
            I build responsive, clean full-stack web applications using the MERN stack and write Python automation tools. Committed to continuous learning, engineering real-world software solutions, and writing maintainable code.
          </motion.p>

          {/* Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center mb-8"
          >
            <a
              href="#projects"
              onClick={(e) => handleScrollToSection(e, 'projects')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-primary to-secondary shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              View My Work
              <ArrowRight size={16} />
            </a>
            
            <a
              href="/resume.pdf"
              download="Majunu_M_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-text-primary bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200"
            >
              Download Resume
              <FileText size={16} />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, 'contact')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-white underline underline-offset-4 decoration-primary transition-all duration-200 pl-2"
            >
              Let's Connect
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-4 border-t border-white/5 pt-6 w-full max-w-md"
          >
            <span className="text-xs uppercase tracking-widest text-text-muted font-bold">Connect:</span>
            <a 
              href={personalInfo.socials.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-text-secondary hover:text-white transition-all duration-200 flex items-center justify-center"
              title="GitHub"
            >
              <i className="fab fa-github text-base"></i>
            </a>
            <a 
              href={personalInfo.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-text-secondary hover:text-white transition-all duration-200 flex items-center justify-center"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin-in text-base"></i>
            </a>
            <a 
              href={emailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-text-secondary hover:text-white transition-all duration-200 flex items-center justify-center"
              title="Email"
            >
              <Mail size={16} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Animated Profile Portrait */}
        <motion.div
          initial={{ x: 50, opacity: 0, scale: 0.96 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 55, damping: 16, delay: 0.25 }}
          className="lg:col-span-5 w-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ rotateY: 4, rotateX: -3, scale: 1.015 }}
            className="relative w-[280px] h-[350px] sm:w-[330px] sm:h-[410px] md:w-[360px] md:h-[440px]"
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-5 rounded-[46%_54%_58%_42%/45%_42%_58%_55%] border border-primary/40"
            >
              <span className="absolute top-1/2 -right-1.5 h-3 w-3 rounded-full bg-primary shadow-[0_0_18px_rgba(99,102,241,0.9)]" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-9 rounded-full border border-dashed border-secondary/25"
            />

            <div className="absolute inset-0 rounded-[46%_54%_48%_52%/54%_44%_56%_46%] bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/20 p-[2px] shadow-[0_30px_80px_-20px_rgba(99,102,241,0.55)]">
              <div className="h-full w-full overflow-hidden rounded-[inherit] border border-white/10 bg-bg-darker">
                <img
                  src={personalInfo.avatarAlt}
                  alt={`Portrait of ${personalInfo.name}`}
                  className="h-full w-full object-cover object-[center_28%] saturate-[0.92] contrast-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-darker/55 via-transparent to-primary/5" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, type: 'spring' }}
              className="absolute -left-3 bottom-10 sm:-left-8 glass-panel px-3 py-2.5 rounded-xl border border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-success shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                <span className="text-xs font-semibold text-white whitespace-nowrap">Open to opportunities</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, type: 'spring' }}
              className="absolute -right-2 top-12 sm:-right-7 glass-panel px-3 py-2 rounded-xl border border-white/10 shadow-xl"
            >
              <span className="text-xs font-mono font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent whitespace-nowrap">
                MERN Developer
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
