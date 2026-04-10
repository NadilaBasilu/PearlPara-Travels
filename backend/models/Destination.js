const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // beaches, mountains, etc.
  description: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String },
  highlights: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Destination', destinationSchema);