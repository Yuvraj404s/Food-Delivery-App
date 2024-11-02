// routes/cart.js
const express = require('express');
const Cart = require('../models/Cart');
const Food = require('../models/FoodItem');
const authMiddleware = require('../middlewares/authMiddleware'); // Use your JWT middleware

const router = express.Router();

// Get the cart for a logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user }).populate('items.foodId');
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

// Add an item to the cart or update quantity if it already exists
router.post('/add', authMiddleware, async (req, res) => {
  const { foodId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);
      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ foodId, quantity });
      }
    } else {
      // If no cart exists, create a new one
      cart = new Cart({
        userId: req.user,
        items: [{ foodId, quantity }],
      });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
});

// Update the quantity of an item in the cart
router.post('/update', authMiddleware, async (req, res) => {
  const { foodId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        if (quantity === 0) {
          cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
        }
        await cart.save();
        res.json(cart);
      } else {
        res.status(404).json({ message: 'Item not found in cart' });
      }
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
});

// Remove an item from the cart
router.post('/remove', authMiddleware, async (req, res) => {
  const { foodId } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user });
    if (cart) {
      cart.items = cart.items.filter(item => item.foodId.toString() !== foodId);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error });
  }
});

module.exports = router;
