// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
