const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Please add a role/position'],
    trim: true
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: [String],
    required: [true, 'Please add a description (accomplishments/tasks)']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Experience', ExperienceSchema);
