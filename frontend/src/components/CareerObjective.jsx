import { Target, Zap, Code, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const CareerObjective = () => {
  return (
    <section id="objective" className="py-24 bg-bg-dark border-t border-white/5 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex p-3 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
            <Target size={28} />
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Engineering Code to Solve <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Real-World Problems</span>
          </h2>

          {/* Premium Copy Block */}
          <div className="glass-panel p-8 sm:p-10 text-left border border-white/5 shadow-2xl relative">
            <span className="absolute -top-3 left-8 px-3 py-0.5 rounded-md bg-primary text-[10px] uppercase font-bold tracking-widest text-white">
              Core Objective
            </span>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans font-medium mb-6">
              "To leverage practical hands-on experience in MERN technologies and Python as a computer science student, contributing to software development in professional environments. Eager to collaborate with teams, design accessible and secure user experiences, and continuously learn new technologies to deliver meaningful real-world software."
            </p>
            
            {/* Core Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/5 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-white/5 text-primary">
                  <Code size={14} />
                </div>
                <div>
                  <span className="font-bold text-white block">Full-Stack Focus</span>
                  <span>MERN & Python toolsets</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-white/5 text-secondary">
                  <Zap size={14} />
                </div>
                <div>
                  <span className="font-bold text-white block">Continuous Growth</span>
                  <span>Fast, adaptive learner</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-white/5 text-accent">
                  <Shield size={14} />
                </div>
                <div>
                  <span className="font-bold text-white block">Practical Design</span>
                  <span>Solving problems cleanly</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerObjective;
