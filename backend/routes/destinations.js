const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get destination by id
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create destination (admin)
router.post('/', async (req, res) => {
  const destination = new Destination(req.body);
  try {
    const newDestination = await destination.save();
    res.status(201).json(newDestination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;