const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const { protect } = require('../middleware/auth');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, level: -1 });
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill not found' });
    }

    skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill not found' });
    }

    await Skill.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
