const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  address: { type: String, required: true },
  paymentIntentId: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
