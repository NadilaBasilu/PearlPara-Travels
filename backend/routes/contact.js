const express = require('express');
const router  = express.Router();
const Contact = require('../models/Contact');
const { auth, admin } = require('../middleware/auth');

// Admin — get all contact messages
router.get('/', auth, admin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public — submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved   = await contact.save();
    res.status(201).json({ message: 'Message sent successfully', id: saved._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin — mark message as read
router.put('/:id/read', auth, admin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, { read: true }, { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Message not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin — delete message
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
