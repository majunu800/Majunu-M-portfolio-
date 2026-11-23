import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Code, GitBranch, Server, Sparkles, MessageSquare } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Skills = () => {
  const { skills } = portfolioData;
  const [activeTab, setActiveTab] = useState("All");

  // Toolkit description details based strictly on CV usage
  const toolkitDetails = {
    "C": {
      icon: <Terminal className="text-primary" size={24} />,
      usage: "Programming languages used in core CSE computational assignments and algorithmic foundations."
    },
    "Java": {
      icon: <Code className="text-secondary" size={24} />,
      usage: "Object-oriented language used for standard data structures and backend logic design."
    },
    "Python": {
      icon: <Terminal className="text-accent" size={24} />,
      usage: "Powering image-processing applications (OpenCV), face detection, and ethical hacking scripts."
    },
    "JavaScript": {
      icon: <Code className="text-[#f7df1e]" size={24} />,
      usage: "Core web language used to program frontend interactivity and backend server applications."
    },
    "HTML": {
      icon: <Code className="text-[#e34f26]" size={24} />,
      usage: "Standard markup language used to build structured layouts for web apps."
    },
    "CSS": {
      icon: <Code className="text-[#1572b6]" size={24} />,
      usage: "Cascading style sheets used for custom responsive styling and layout systems."
    },
    "MongoDB": {
      icon: <Database className="text-success" size={24} />,
      usage: "NoSQL document store used for full-stack user database schemas and application data."
    },
    "Express.js": {
      icon: <Server className="text-white" size={24} />,
      usage: "Fast, unopinionated Node.js framework used to implement structured RESTful APIs."
    },
    "React.js": {
      icon: <Code className="text-[#61dafb]" size={24} />,
      usage: "Frontend library used to assemble modular user interfaces and state-driven components."
    },
    "Node.js": {
      icon: <Server className="text-success" size={24} />,
      usage: "JavaScript runtime environment used to build scalable networking and server endpoints."
    },
    "Git": {
      icon: <GitBranch className="text-[#f05032]" size={24} />,
      usage: "Distributed version control tool used to commit, branch, and merge development code."
    },
    "GitHub": {
      icon: <i className="fab fa-github text-xl text-white"></i>,
      usage: "Online hosting service used to share projects, manage remote code, and review team PRs."
    },
    "Visual Studio Code": {
      icon: <Code className="text-[#007acc]" size={24} />,
      usage: "Primary IDE used for code editing, terminal commands, and workspace file configuration."
    }
  };

  const categories = ["All", ...skills.categories.map(c => c.name)];

  const getFilteredSkills = () => {
    if (activeTab === "All") {
      return skills.categories.flatMap(c => c.items.map(name => ({ name, category: c.name })));
    }
    const cat = skills.categories.find(c => c.name === activeTab);
    return cat ? cat.items.map(name => ({ name, category: cat.name })) : [];
  };

  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case "Programming Languages": return <Terminal size={16} className="text-primary" />;
      case "Web Technologies": return <Code size={16} className="text-secondary" />;
      case "MERN Stack": return <Server size={16} className="text-accent" />;
      case "Tools": return <GitBranch size={16} className="text-success" />;
      case "Professional Skills": return <MessageSquare size={16} className="text-[#ffb86c]" />;
      default: return <Sparkles size={16} />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-bg-dark border-t border-white/5 relative">
      <div className="absolute top-[20%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Proficiencies</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 relative inline-block pb-3">
            Skills & Toolkit
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
        </div>

        {/* 1. Categorized Proficiencies Panel */}
        <div className="mb-20">
          <h3 className="text-sm uppercase tracking-widest text-text-muted font-bold text-center mb-8">
            Skill Categories
          </h3>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer ${
                  activeTab === cat
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                    : "bg-white/5 border-white/5 text-text-secondary hover:text-white hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left"
          >
            <AnimatePresence mode="popLayout">
              {getFilteredSkills().map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 rounded-xl glass-panel relative flex items-center gap-4 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-tight">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-semibold block">
                      {skill.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 2. Development Toolkit Grid */}
        <div className="pt-12 border-t border-white/5">
          <h3 className="text-sm uppercase tracking-widest text-text-muted font-bold text-center mb-4">
            Development Toolkit
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary text-center max-w-lg mx-auto mb-12">
            Hover over each tool to see how it is used in my academic studies and project implementations.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
            {Object.entries(toolkitDetails).map(([name, detail]) => (
              <div
                key={name}
                className="group relative p-6 rounded-xl glass-panel flex flex-col items-center justify-center gap-3 cursor-default hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                  {detail.icon}
                </div>
                <span className="text-xs font-semibold text-text-secondary group-hover:text-white transition-colors duration-200">
                  {name}
                </span>

                {/* Toolkit hover details dropdown (Tooltip) */}
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 p-3 rounded-lg bg-bg-darker border border-white/10 text-center opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 transform scale-95 group-hover:scale-100 shadow-xl z-20">
                  <span className="font-bold text-[10px] text-primary uppercase block mb-1">
                    {name}
                  </span>
                  <p className="text-[10px] text-text-secondary leading-relaxed font-sans">
                    {detail.usage}
                  </p>
                  {/* Tooltip caret */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-bg-darker" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
