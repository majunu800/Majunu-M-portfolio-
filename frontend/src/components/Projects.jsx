import { useState } from 'react';
import { ArrowRight, Layers, Shield, Cpu, MapPin, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Projects = () => {
  const { projects } = portfolioData;
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Add detail fields directly to project configurations
  const projectDetails = [
    {
      icon: <Layers size={40} className="text-primary" />,
      features: [
        "User registration and login pipelines",
        "Event scheduling database architecture",
        "Admin control panel for organizing registration details",
        "Responsive, grid-aligned mobile web layout"
      ],
      learned: "Learned how to map schema relations in relational databases (MySQL) and link them to Express routes, alongside styling fully responsive client dashboards."
    },
    {
      icon: <Cpu size={40} className="text-secondary" />,
      features: [
        "Face boundary detection on input images",
        "Grayscale conversion and histogram normalization pre-processing",
        "Accurate coordinate boundary box drawing overlay"
      ],
      learned: "Gained core insight into computer vision concepts, matrix manipulation of image channels, and configuring OpenCV image filters."
    },
    {
      icon: <Shield size={40} className="text-accent" />,
      features: [
        "Testing character-complexity rules (numbers, capitals, symbols)",
        "Local dictionary matching verification",
        "Entropy calculation feedback to analyze strength"
      ],
      learned: "Acquired critical understanding of hashing functions, credential vulnerability vectors, and secure coding awareness in application systems."
    },
    {
      icon: <MapPin size={40} className="text-primary" />,
      features: [
        "Public IPv4 and IPv6 lookup with ISP and ASN metadata",
        "Approximate IP geolocation displayed on an interactive map",
        "Side-by-side IP comparison and browser-local lookup history",
        "Privacy guidance distinguishing IP geolocation from device GPS"
      ],
      learned: "Practiced validating network addresses, normalizing geolocation API responses, visualizing approximate locations, and communicating IP geolocation limitations."
    },
    {
      icon: <ShieldCheck size={40} className="text-secondary" />,
      features: [
        "Hybrid prompt screening with configurable rules and an ML classifier",
        "Risk scores mapped to allow, warn, or block policy decisions",
        "Dashboard, analytics, and searchable SQLite analysis history",
        "Educational attack-simulation scenarios and model evaluation metrics"
      ],
      learned: "Explored combining rule-based checks with machine learning, presenting explainable risk decisions, and evaluating a text classifier with standard metrics."
    },
    {
      icon: <Cpu size={40} className="text-accent" />,
      features: [
        "CNN training and evaluation using the MNIST digit dataset",
        "Streamlit drawing canvas and image upload for digit prediction",
        "Prediction probabilities and confidence display",
        "Accuracy/loss graphs, confusion matrix, and classification report"
      ],
      learned: "Practiced image preprocessing, CNN model training, multiclass prediction, and interpreting model evaluation metrics."
    }
  ];

  const handleToggleDetails = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section id="projects" className="py-24 bg-bg-darker relative grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Showcase</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 relative inline-block pb-3">
            Projects
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left items-start">
          {projects.map((project, index) => {
            const extra = projectDetails[index] || {};
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                layout
                className="rounded-xl glass-panel overflow-hidden flex flex-col h-full border border-white/5 shadow-lg group hover:border-primary/20 transition-all duration-300"
              >
                {/* Visual Area (Abstract Visual Generator) */}
                <div className="h-48 w-full bg-linear-to-br from-bg-dark to-bg-darker relative flex items-center justify-center p-6 border-b border-white/5 overflow-hidden">
                  {/* Decorative glowing gradient sphere */}
                  <div className={`absolute w-32 h-32 rounded-full blur-2xl opacity-10 -bottom-4 -right-4 transition-all duration-500 group-hover:scale-125 ${
                    index === 0 ? 'bg-primary' : index === 1 ? 'bg-secondary' : 'bg-accent'
                  }`} />
                  
                  {/* Visual Icons */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-full group-hover:scale-110 group-hover:border-primary/20 transition-all duration-300">
                      {extra.icon}
                    </div>
                    {project.isNonAcademic && (
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-accent/15 border border-accent/25 text-accent">
                        Non-Academic Project
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-display font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-text-secondary mb-6 leading-relaxed flex-grow font-sans">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-white/5 border border-white/10 text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
                    <button
                      onClick={() => handleToggleDetails(index)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {isExpanded ? "Hide Details" : "View Details"}
                      <ArrowRight size={14} className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-text-secondary hover:text-white transition-all duration-200 flex items-center justify-center"
                        title="GitHub Repository"
                      >
                        <i className="fab fa-github text-sm"></i>
                      </a>
                    </div>
                  </div>

                  {/* Expandable Panel */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4 pt-4 border-t border-white/5 text-xs text-text-secondary space-y-4"
                      >
                        <div>
                          <span className="font-bold text-white uppercase tracking-wider block mb-2">Key Features:</span>
                          <ul className="list-disc pl-4 space-y-1.5 leading-relaxed font-sans">
                            {extra.features.map((feature, fIdx) => (
                              <li key={fIdx}>{feature}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-bold text-white uppercase tracking-wider block mb-1">What I Learned:</span>
                          <p className="leading-relaxed font-sans">{extra.learned}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;
