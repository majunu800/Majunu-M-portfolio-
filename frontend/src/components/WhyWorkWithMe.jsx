import { HelpCircle, Users, GraduationCap, Grid } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyWorkWithMe = () => {
  const cards = [
    {
      icon: <HelpCircle className="text-primary" size={24} />,
      title: "Problem Solver",
      description: "Equipped with strong problem-solving skills, focusing on logic design, debugging, and building optimized algorithms to address real software challenges."
    },
    {
      icon: <Users className="text-secondary" size={24} />,
      title: "Collaborative Team Player",
      description: "Experienced in coordinating with teammates during my MERN internship to establish consistent code styling, design pages, and review pull requests on GitHub."
    },
    {
      icon: <GraduationCap className="text-accent" size={24} />,
      title: "Continuous Learner",
      description: "Dedicated to keeping pace with active industry changes, acquiring new frontend frameworks, studying security standards, and advancing my developer skill set."
    },
    {
      icon: <Grid className="text-success" size={24} />,
      title: "Full-Stack Mindset",
      description: "Capable of designing database schemas (MongoDB, MySQL), implementing Express server routers, and styling clean responsive frontend pages using React."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="why-me" className="py-24 bg-bg-dark border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Value Proposition</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 relative inline-block pb-3">
            Why Work With Me
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
        </div>

        {/* Grid layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="p-6 rounded-xl glass-panel relative flex flex-col justify-between h-64 hover:-translate-y-1 transition-all duration-300 text-left group"
            >
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg w-fit group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                {card.icon}
              </div>
              
              <div className="space-y-2 mt-auto">
                <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-primary transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyWorkWithMe;
