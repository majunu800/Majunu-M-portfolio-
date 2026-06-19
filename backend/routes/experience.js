const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { protect } = require('../middleware/auth');

// @desc    Get all experience
// @route   GET /api/experience
// @access  Public
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Create an experience
// @route   POST /api/experience
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Update an experience
// @route   PUT /api/experience/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ success: false, error: 'Experience record not found' });
    }

    experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Delete an experience
// @route   DELETE /api/experience/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ success: false, error: 'Experience record not found' });
    }

    await Experience.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
