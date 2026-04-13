const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  type:        { type: String, required: true, enum: ['beach','cultural','wildlife','nature','honeymoon'] },
  badge:       { type: String },
  tagline:     { type: String },
  description: { type: String, required: true },
  image:       { type: String, required: true },
  gallery:     [String],
  price:       { type: Number, required: true },
  duration:    { type: String },
  groupSize:   { type: String },
  bestFor:     { type: String },
  highlights: [{
    icon:  String,
    title: String,
    desc:  String,
  }],
  itinerary: [{
    day:   mongoose.Schema.Types.Mixed,
    title: String,
    desc:  String,
  }],
  includes:   [String],
  excludes:   [String],
  routeStops: [{
    name: String,
    lat:  Number,
    lng:  Number,
    day:  mongoose.Schema.Types.Mixed,
  }],
  featured:  { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tour', tourSchema);
