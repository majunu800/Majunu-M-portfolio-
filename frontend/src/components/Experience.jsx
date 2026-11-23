import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-24 bg-bg-dark border-t border-white/5 relative">
      {/* Background decoration */}
      <div className="absolute top-[30%] right-[10%] w-[30vw] height-[30vw] rounded-full bg-secondary/5 blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">My Journey</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 relative inline-block pb-3">
            Work Experience
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
        </div>

        {/* Timeline wrapper */}
        <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-4">
          
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative mb-12 last:mb-0 text-left"
            >
              {/* Timeline Marker Icon */}
              <span className="absolute -left-[39px] sm:-left-[47px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-bg-dark border-2 border-primary shadow-md shadow-primary/20 text-primary z-10">
                <Briefcase size={14} />
              </span>

              {/* Experience Card */}
              <div className="p-8 rounded-xl glass-panel relative group">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <h4 className="text-sm font-semibold text-accent mt-1">
                      {exp.company}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center text-xs font-semibold text-text-muted">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                      <Calendar size={12} />
                      {exp.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                      <MapPin size={12} />
                      India
                    </span>
                  </div>
                </div>

                {/* Description Bullets */}
                <ul className="space-y-3 mb-6">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed font-sans">
                      <CheckCircle className="text-primary mt-1 shrink-0" size={14} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies used */}
                <div>
                  <span className="text-xs uppercase tracking-widest text-text-muted font-bold block mb-3">Key Technologies:</span>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-text-secondary group-hover:border-primary/20 group-hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Experience;
