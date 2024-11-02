const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: {
    type: String,  // URL of the food item image
    required: true,
  },
  cuisine: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuisine', required: true }
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
