import { BookOpen, Laptop, Milestone, Compass, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfessionalJourney = () => {
  const steps = [
    {
      year: "2023 – 2024",
      title: "Foundations in IT Applications",
      subtitle: "CSC Computer Software College",
      description: "Completed an Honours Diploma in Computer Application (HDCA), earning Grade B. Gained introductory knowledge of hardware, software, and core coding concepts.",
      icon: <BookOpen size={16} />,
      color: "text-primary"
    },
    {
      year: "2024 – 2028",
      title: "B.Tech Computer Science Degree",
      subtitle: "Amrita Vishwa Vidyapeetham, Nagercoil",
      description: "Enrolled in Bachelor of Technology in CSE, studying advanced programming, computational math, and computer science concepts.",
      icon: <Laptop size={16} />,
      color: "text-secondary"
    },
    {
      year: "Internship",
      title: "MERN Stack Intern",
      subtitle: "BaShrithi Campus Technopark",
      description: "Applied frontend and backend MERN stacks in a professional setting. Collaborated with teams, built responsive APIs, and managed repos via Git/GitHub.",
      icon: <Milestone size={16} />,
      color: "text-accent"
    },
    {
      year: "Portfolio Projects",
      title: "Software Engineering Projects",
      subtitle: "MERN stack & Python applications",
      description: "Engineered real-world tools, including an Event Management system using Node/Express/MySQL and Python image processing/cybersecurity scripts.",
      icon: <Compass size={16} />,
      color: "text-success"
    },
    {
      year: "Active Goal",
      title: "Aspiring Full-Stack Engineer",
      subtitle: "Recruitment & Continuous Learning",
      description: "Seeking opportunities to build scalable backend systems, write clean client UIs, and solve practical business problems.",
      icon: <Rocket size={16} />,
      color: "text-primary"
    }
  ];

  return (
    <section id="journey" className="py-24 bg-bg-darker border-t border-white/5 relative grid-bg">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Evolution</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 relative inline-block pb-3">
            Professional Journey
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-white/5 pl-8 ml-4 space-y-12 text-left">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* timeline bullet */}
              <span className={`absolute -left-[49px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-bg-darker border border-white/10 group-hover:border-primary transition-all duration-300 ${step.color} z-10`}>
                {step.icon}
              </span>

              {/* Step info */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                  {step.year}
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <h4 className="text-xs sm:text-sm font-semibold text-text-muted">
                  {step.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-2xl pt-1">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProfessionalJourney;
