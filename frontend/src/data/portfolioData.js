export const portfolioData = {
  personalInfo: {
    name: "Majunu M",
    title: "B.Tech Computer Science Student & Full-Stack Developer",
    subtitle: "MERN Stack | Python | Problem Solver",
    objective: "Detail-oriented B.Tech Computer Science student with hands-on MERN internship experience and practical expertise in full-stack web development. Adept at designing scalable database schemas, implementing structured REST APIs, and building responsive user interfaces. Committed to continuous learning and eager to contribute to innovative software projects in professional settings.",
    avatar: "/profile.jpg",
    avatarAlt: "/profile-alt.jpg",
    socials: {
      github: "https://github.com/majunu800",
      linkedin: "https://www.linkedin.com/in/majunu-m-313656359",
      email: "mailto:majunu390@gmail.com",
      phone: "tel:+918778651246",
      phoneRaw: "+91 87786 51246"
    }
  },
  experience: [
    {
      company: "Shrithi Campus Technopark",
      role: "MERN Stack Intern",
      duration: "Internship",
      description: [
        "Developed and maintained web applications using MongoDB, Express.js, React.js, and Node.js.",
        "Collaborated with team members to design responsive and user-friendly interfaces.",
        "Worked with Git and GitHub for version control and project management."
      ],
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Git", "GitHub"]
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Amrita Vishwa Vidyapeetham, Nagercoil",
      duration: "2024 – 2028",
      description: "Pursuing standard CSE curriculum with focus on algorithms, full-stack technologies, and practical software engineering."
    },
    {
      degree: "Honours Diploma in Computer Application (HDCA)",
      institution: "CSC Computer Software College",
      duration: "July 2023 – July 2024",
      grade: "Grade: B",
      description: "Completed comprehensive computer applications program covering programming fundamentals and application software."
    }
  ],
  projects: [
    {
      title: "Event Management Website",
      isNonAcademic: true,
      description: "Developed a web-based platform for managing events, registrations, and schedules for my client. Implemented the frontend using HTML, CSS, and JavaScript, and built the backend using Node.js and Express.js with a MySQL database to handle user registration, event management, and scheduling functionalities.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MySQL"],
      category: "Full-Stack",
      githubLink: "https://github.com/majunu800",
      liveLink: ""
    },
    {
      title: "Face Detection System",
      description: "Built a face detection model using Python. Implemented image processing techniques for detecting human faces in images to understand basic computer vision pipelines.",
      technologies: ["Python", "OpenCV", "Image Processing"],
      category: "Python",
      githubLink: "https://github.com/majunu800",
      liveLink: ""
    },
    {
      title: "Password Cracking Tool",
      description: "Developed a basic password testing tool for understanding cybersecurity concepts. Focused on ethical hacking principles and security awareness to analyze password strengths.",
      isNonAcademic: true,
      technologies: ["Python", "Cybersecurity", "Ethical Hacking"],
      category: "Security",
      githubLink: "https://github.com/majunu800",
      liveLink: ""
    },
    {
      title: "IPTrace India — IP Address Intelligence & Geolocation Tracker",
      isNonAcademic: true,
      description: "Built a full-stack application for investigating public IPv4 and IPv6 addresses. It presents ISP and ASN metadata, approximate IP-based locations on an interactive map, and comparison tools while explaining that IP geolocation is not a device's exact GPS location.",
      technologies: ["React", "Vite", "Leaflet", "Node.js", "Express.js", "IP Geolocation APIs"],
      category: "Computer Networks",
      githubLink: "https://github.com/majunu800",
      liveLink: ""
    },
    {
      title: "AI PromptShield",
      description: "Academic cybersecurity project: a FastAPI and React application that screens prompts with rule-based checks and a TF-IDF/logistic-regression classifier, calculates configurable risk scores, and applies allow, warn, or block policies. Includes a dashboard, SQLite analysis history, and an educational attack-simulation lab.",
      technologies: ["Python", "FastAPI", "React 18", "scikit-learn", "SQLite", "Recharts"],
      category: "Academic Cybersecurity",
      githubLink: "https://github.com/majunu800/AI-PromptShield",
      liveLink: ""
    },
    {
      title: "Handwritten Digit Recognition using CNN",
      description: "Academic machine-learning project that trains a Convolutional Neural Network on MNIST to recognize handwritten digits from 0 to 9. A Streamlit app supports drawing or uploading a digit and displays predictions with confidence alongside model evaluation visualizations.",
      technologies: ["Python", "TensorFlow/Keras", "Streamlit", "NumPy", "scikit-learn", "Matplotlib"],
      category: "Machine Learning",
      githubLink: "https://github.com/majunu800/Handwritten-Digit-Recognition-Using-Convolutional-Neural-Network",
      liveLink: ""
    }
  ],
  skills: {
    categories: [
      {
        name: "Programming Languages",
        items: ["C", "Java", "Python", "JavaScript"]
      },
      {
        name: "Web Technologies",
        items: ["HTML", "CSS"]
      },
      {
        name: "MERN Stack",
        items: ["MongoDB", "Express.js", "React.js", "Node.js"]
      },
      {
        name: "Tools",
        items: ["Git", "GitHub", "Visual Studio Code"]
      },
      {
        name: "Professional Skills",
        items: ["Problem Solving", "Team Collaboration", "Communication"]
      }
    ]
  }
};
