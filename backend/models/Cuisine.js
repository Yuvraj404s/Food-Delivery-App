const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Cuisine', cuisineSchema);
