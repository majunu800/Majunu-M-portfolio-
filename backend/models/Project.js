const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a project description']
  },
  image: {
    type: String,
    default: 'placeholder.jpg'
  },
  technologies: {
    type: [String],
    required: [true, 'Please add technologies used']
  },
  githubLink: {
    type: String,
    trim: true,
    default: ''
  },
  liveLink: {
    type: String,
    trim: true,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
