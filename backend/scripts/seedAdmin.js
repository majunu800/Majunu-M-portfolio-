const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Load models
const User = require('../models/User');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/personal-portfolio');
    console.log('MongoDB Connected for Seeding...');

    // Clear existing collections
    await User.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Experience.deleteMany();
    await Education.deleteMany();
    console.log('Existing data cleared.');

    // Seed Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPassword123!';
    
    await User.create({
      email: adminEmail,
      password: adminPassword
    });
    console.log(`Admin user created: ${adminEmail}`);

    // Seed Skills
    const skills = [
      { name: 'React.js', category: 'Frontend', level: 85, icon: 'fab fa-react' },
      { name: 'JavaScript', category: 'Frontend', level: 90, icon: 'fab fa-js' },
      { name: 'HTML & CSS', category: 'Frontend', level: 88, icon: 'fab fa-html5' },
      { name: 'Node.js', category: 'Backend', level: 84, icon: 'fab fa-node-js' },
      { name: 'Express.js', category: 'Backend', level: 82, icon: 'fas fa-server' },
      { name: 'MongoDB', category: 'Database', level: 80, icon: 'fas fa-database' },
      { name: 'Python', category: 'Backend', level: 82, icon: 'fab fa-python' },
      { name: 'Git & GitHub', category: 'Tools', level: 90, icon: 'fab fa-github' }
    ];
    await Skill.insertMany(skills);
    console.log('Skills seeded successfully!');

    // Seed Projects
    const projects = [
      {
        title: 'Event Management Website',
        description: 'Developed a web-based platform for managing events, registrations, and schedules for a client. Implemented the frontend with HTML, CSS, and JavaScript, and built the backend using Node.js and Express.js with a MySQL database.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MySQL'],
        githubLink: 'https://github.com/majunu800',
        liveLink: '',
        featured: true,
        order: 1
      },
      {
        title: 'Face Detection System',
        description: 'Built a Python-based face detection system using image processing techniques. The project detects human faces in images and demonstrates an understanding of computer vision fundamentals.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        technologies: ['Python', 'OpenCV', 'Computer Vision'],
        githubLink: 'https://github.com/majunu800',
        liveLink: '',
        featured: true,
        order: 2
      },
      {
        title: 'Password Cracking Tool',
        description: 'Developed a password testing tool to explore cybersecurity concepts and ethical hacking. Focused on secure coding principles and security awareness while building core password validation features.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        technologies: ['Python', 'Security', 'Ethical Hacking'],
        githubLink: 'https://github.com/majunu800',
        liveLink: '',
        featured: false,
        order: 3
      }
    ];
    await Project.insertMany(projects);
    console.log('Projects seeded successfully!');

    // Seed Experiences
    const experiences = [
      {
        company: 'BaShrithi Campus Technopark',
        role: 'MERN Stack Intern',
        location: 'Nagercoil, India',
        startDate: new Date('2024-01-01'),
        current: true,
        description: [
          'Developed and maintained web applications using MongoDB, Express.js, React.js, and Node.js.',
          'Collaborated with team members to design responsive and user-friendly interfaces.',
          'Worked with Git and GitHub for version control and project management.'
        ]
      }
    ];
    await Experience.insertMany(experiences);
    console.log('Experiences seeded successfully!');

    // Seed Education
    const education = [
      {
        institution: 'Amrita Vishwa Vidyapeetham, Nagercoil',
        degree: 'Bachelor of Technology in Computer Science and Engineering',
        fieldOfStudy: '',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2028-05-30'),
        current: true,
        description: 'Pursuing a B.Tech degree with a focus on software development, MERN stack applications, and web technologies.'
      },
      {
        institution: 'CSC Computer Software College',
        degree: 'Honours Diploma in Computer Application (HDCA)',
        fieldOfStudy: '',
        startDate: new Date('2023-07-01'),
        endDate: new Date('2024-07-31'),
        current: false,
        description: 'Completed HDCA with Grade B and gained a strong foundation in computer applications and programming.'
      }
    ];
    await Education.insertMany(education);
    console.log('Education seeded successfully!');

    console.log('All seeding operations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedData();
