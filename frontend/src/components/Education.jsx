import { GraduationCap, Calendar, Award, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Education = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-24 bg-bg-darker relative grid-bg">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Academic Background</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 relative inline-block pb-3">
            Education
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-4">
          
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative mb-12 last:mb-0 text-left"
            >
              {/* Timeline marker node */}
              <span className="absolute -left-[39px] sm:-left-[47px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-bg-darker border-2 border-secondary shadow-md shadow-secondary/20 text-secondary z-10">
                <GraduationCap size={14} />
              </span>

              {/* Education timeline card */}
              <div className="p-8 rounded-xl glass-panel relative group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-white/5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-secondary transition-colors duration-300">
                      {edu.degree}
                    </h3>
                    <h4 className="text-sm font-semibold text-accent mt-1">
                      {edu.institution}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-text-muted">
                      <Calendar size={12} />
                      {edu.duration}
                    </span>
                    {edu.grade && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-semibold text-secondary">
                        <Award size={12} />
                        {edu.grade}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed font-sans mb-4">
                  {edu.description}
                </p>

                {/* Academic focal points */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Check size={14} className="text-success" />
                    <span>Structured Curriculum</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Check size={14} className="text-success" />
                    <span>Practical Assignments</span>
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

export default Education;
