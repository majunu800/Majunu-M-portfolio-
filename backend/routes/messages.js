const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');
const { protect } = require('../middleware/auth');

// @desc    Submit a contact message
// @route   POST /api/messages
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, and message' });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'No Subject',
      message
    });

    // Send notification email to portfolio owner (non-blocking)
    (async () => {
      try {
        const to = process.env.EMAIL_TO || process.env.EMAIL_USER;
        if (to && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          const mailSubject = `New portfolio message: ${newMessage.subject}`;
          const html = `<p><strong>Name:</strong> ${newMessage.name}</p>
                        <p><strong>Email:</strong> ${newMessage.email}</p>
                        <p><strong>Message:</strong></p>
                        <p>${newMessage.message.replace(/\n/g, '<br/>')}</p>
                        <p><em>Received at ${new Date(newMessage.createdAt).toLocaleString()}</em></p>`;

          await sendEmail({ to, subject: mailSubject, html, text: `${newMessage.name} <${newMessage.email}>: ${newMessage.message}` });
        }
      } catch (err) {
        console.error('Failed to send message notification email:', err.message || err);
      }
    })();

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private
router.put('/:id/read', protect, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    message.read = true;
    await message.save();

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
