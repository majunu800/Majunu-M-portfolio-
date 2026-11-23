import { Layers, Monitor, Database, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatIBuild = () => {
  const focuses = [
    {
      icon: <Layers size={28} className="text-primary" />,
      title: "Full-Stack Development",
      description: "Designing and maintaining cohesive web applications using modern frontend frameworks and structured backend servers. Focused on end-to-end integration and responsive design."
    },
    {
      icon: <Monitor size={28} className="text-secondary" />,
      title: "Frontend Development",
      description: "Developing clean, interactive, and mobile-friendly user interfaces. Writing semantic HTML, CSS, and modern JavaScript to create smooth user experiences across devices."
    },
    {
      icon: <Database size={28} className="text-accent" />,
      title: "Backend & Database",
      description: "Implementing structured REST APIs with Express.js and Node.js. Designing and querying databases using MongoDB and relational databases like MySQL to manage application data."
    },
    {
      icon: <Terminal size={28} className="text-success" />,
      title: "Python Development",
      description: "Building Python-based desktop tools and scripting applications. Gaining hands-on experience in image processing, basic computer vision (OpenCV), and script automation."
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="what-i-build" className="py-24 bg-bg-darker relative grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 relative inline-block pb-3">
            What I Build
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
        </div>

        {/* Grid cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {focuses.map((focus, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="p-8 rounded-xl glass-panel relative overflow-hidden group flex flex-col items-start text-left hover:-translate-y-1 transition-all duration-300"
            >
              {/* Background gradient indicator */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg mb-6 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                {focus.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                {focus.title}
              </h3>
              
              <p className="text-sm text-text-secondary leading-relaxed font-sans">
                {focus.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhatIBuild;
