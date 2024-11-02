// routes/food.js
const express = require('express');
const router = express.Router();
const Food = require('../models/FoodItem');
const Cuisine = require('../models/Cuisine');

// Get food items by cuisine name
router.get('/:cuisine', async (req, res) => {
  try {
    const cuisineName = req.params.cuisine;

    // Find the cuisine by name (use a case-insensitive regex match for better UX)
    const cuisine = await Cuisine.findOne({ name: new RegExp('^' + cuisineName + '$', 'i') });

    if (!cuisine) {
      return res.status(404).json({ message: 'Cuisine not found' });
    }

    // Find food items with the corresponding cuisine ObjectId
    const foodItems = await Food.find({ cuisine: cuisine._id });

    if (foodItems.length === 0) {
      return res.status(404).json({ message: 'No food items found for this cuisine' });
    }

    res.json(foodItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
