import { BookOpen, Target, Cpu, User } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const cardItems = [
    {
      icon: <BookOpen className="text-primary" size={24} />,
      title: "Education",
      description: "B.Tech Computer Science and Engineering"
    },
    {
      icon: <Target className="text-secondary" size={24} />,
      title: "Focus",
      description: "Full-Stack Development"
    },
    {
      icon: <Cpu className="text-accent" size={24} />,
      title: "Primary Stack",
      description: "MERN Stack + Python"
    },
    {
      icon: <User className="text-success" size={24} />,
      title: "Current Stage",
      description: "Computer Science Student"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="about" className="py-24 bg-bg-dark border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Discover</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 relative inline-block pb-3">
            About Me
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Intro */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
              I develop practical web solutions combining frontend interactivity with robust backend systems.
            </h3>
            
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
              As a Computer Science student at Amrita Vishwa Vidyapeetham, I have built a solid foundation in programming and software architecture. My hands-on experience as a MERN stack intern has taught me how to develop and maintain responsive applications, write clean REST APIs, and design database structures using MongoDB and MySQL.
            </p>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
              Along with JavaScript and Node, I also work extensively with Python for image processing and scripting. I approach programming with a problem-solving mindset and a collaborative attitude, leveraging tools like Git and GitHub to manage version control and participate in team reviews. My ultimate goal is to continually build real-world software that provides immediate value.
            </p>

            <div className="pt-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">Career Goal</span>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  To contribute to innovative software development projects in a professional, recruiter-friendly environment where I can continuously improve my full-stack skillset.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {cardItems.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-xl glass-panel flex flex-col justify-between h-48 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 cursor-default group border-white/5 transition-all duration-300"
              >
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg w-fit group-hover:bg-primary/15 group-hover:border-primary/40 transition-all duration-300">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest text-text-muted font-bold group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-sm font-medium text-white leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;
