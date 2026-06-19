const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: [true, 'Please add an educational institution'],
    trim: true
  },
  degree: {
    type: String,
    required: [true, 'Please add a degree or certificate'],
    trim: true
  },
  fieldOfStudy: {
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
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Education', EducationSchema);
