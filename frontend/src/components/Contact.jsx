import { useState } from 'react';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { apiRequest } from '../utils/api';
import { getGmailComposeUrl } from '../utils/emailLinks';

const Contact = () => {
  const { personalInfo } = portfolioData;
  const emailAddress = personalInfo.socials.email.replace(/^mailto:/, '');
  const emailComposeUrl = getGmailComposeUrl(personalInfo.socials.email);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setSubmitError('');
    try {
      await apiRequest('/messages', 'POST', formData);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      setSubmitError(error.message || 'Unable to send your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg-darker relative overflow-hidden grid-bg">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 left-[10%] w-[35vw] h-[35vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mt-2 relative inline-block pb-3">
            Let's Build Something Meaningful
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct details */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                Let's discuss your next project
              </h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
                I am actively seeking internship opportunities and collaborations on full-stack web and Python applications. Drop me an email, connect on LinkedIn, or fill out the form. Let's work together!
              </p>
            </div>

            {/* Methods list */}
            <div className="space-y-4">
              <a 
                href={emailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/20 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center w-11 h-11 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Email Me</span>
                  <span className="text-sm sm:text-base font-semibold text-white block mt-0.5">{emailAddress}</span>
                </div>
              </a>

              <a 
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-secondary/20 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 flex items-center justify-center w-11 h-11 shrink-0">
                  <i className="fab fa-linkedin-in text-base"></i>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted">LinkedIn Profile</span>
                  <span className="text-sm sm:text-base font-semibold text-white block mt-0.5">linkedin.com/in/majunu-m</span>
                </div>
              </a>

              <a 
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/20 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/25 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 flex items-center justify-center w-11 h-11 shrink-0">
                  <i className="fab fa-github text-base"></i>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted">GitHub Repos</span>
                  <span className="text-sm sm:text-base font-semibold text-white block mt-0.5">github.com/majunu800</span>
                </div>
              </a>

              {/* Less prominent phone display */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 opacity-70">
                <div className="p-3 rounded-lg bg-white/5 text-text-muted flex items-center justify-center w-11 h-11 shrink-0">
                  <Phone size={14} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Call Me (Alternative)</span>
                  <span className="text-xs sm:text-sm text-text-secondary block mt-0.5">{personalInfo.socials.phoneRaw}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 w-full">
            <div className="p-8 rounded-xl glass-panel relative">
              <h4 className="text-lg font-display font-bold text-white mb-6 text-left">
                Send a Message
              </h4>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-text-secondary uppercase">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-text-muted focus:outline-hidden focus:border-primary focus:bg-white/10 transition-all font-sans text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-text-secondary uppercase">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-text-muted focus:outline-hidden focus:border-primary focus:bg-white/10 transition-all font-sans text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold text-text-secondary uppercase">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-text-muted focus:outline-hidden focus:border-primary focus:bg-white/10 transition-all font-sans text-sm"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-text-secondary uppercase">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-text-muted focus:outline-hidden focus:border-primary focus:bg-white/10 transition-all font-sans text-sm resize-none"
                    placeholder="Describe how we can work together..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold uppercase tracking-wider text-white bg-linear-to-r from-primary to-secondary shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send size={14} />
                </button>
                {submitError && (
                  <p role="alert" className="text-sm text-red-400">
                    {submitError}
                  </p>
                )}
              </form>

              {/* Status Banner */}
              <AnimatePresence>
                {isSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-0 bg-bg-darker/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-10 rounded-xl"
                  >
                    <CheckCircle className="text-success mb-3 animate-bounce" size={48} />
                    <h5 className="text-lg font-bold text-white mb-2">Message Sent!</h5>
                    <p className="text-xs text-text-secondary max-w-xs leading-relaxed font-sans">
                      Thank you for reaching out. Your message has been received, and I will respond via email shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
