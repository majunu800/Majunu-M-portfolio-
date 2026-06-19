const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const { protect } = require('../middleware/auth');

// @desc    Get all education
// @route   GET /api/education
// @access  Public
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, count: education.length, data: education });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Create an education
// @route   POST /api/education
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, data: education });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Update an education
// @route   PUT /api/education/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ success: false, error: 'Education record not found' });
    }

    education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: education });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Delete an education
// @route   DELETE /api/education/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ success: false, error: 'Education record not found' });
    }

    await Education.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
