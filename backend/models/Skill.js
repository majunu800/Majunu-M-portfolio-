const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a skill name'],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
    default: 'Frontend'
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    default: 80
  },
  icon: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Skill', SkillSchema);
