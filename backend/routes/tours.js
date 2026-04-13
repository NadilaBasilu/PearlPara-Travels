const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const Tour     = require('../models/Tour');
const { auth, admin } = require('../middleware/auth');

// Public — get all tours
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public — get single tour by id or slug
router.get('/:id', async (req, res) => {
  try {
    const tour = mongoose.Types.ObjectId.isValid(req.params.id)
      ? await Tour.findById(req.params.id)
      : await Tour.findOne({ slug: req.params.id });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin — create tour
router.post('/', auth, admin, async (req, res) => {
  try {
    const tour = new Tour(req.body);
    const saved = await tour.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin — update tour
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin — delete tour
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tour deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
