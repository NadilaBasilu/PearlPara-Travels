const express = require('express');
const router  = express.Router();
const Destination = require('../models/Destination');
const { auth, admin } = require('../middleware/auth');

// Public — get all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public — get destination by id
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin — create destination
router.post('/', auth, admin, async (req, res) => {
  try {
    const destination = new Destination(req.body);
    const saved = await destination.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin — update destination
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin — delete destination
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Destination deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
