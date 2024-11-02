// In your backend routes (e.g., routes/cuisines.js)

const express = require('express');
const router = express.Router();
const Cuisine = require('../models/Cuisine');  // Assuming you have a Cuisine model
const Food = require('../models/FoodItem');  // Assuming you have a Food model

// Get food items by cuisine ID
router.get('/:cuisine/foods', async (req, res) => {
  try {
    const { cuisine } = req.params;
    const foodItems = await Food.find({ cuisine: cuisine });  // Assuming Food schema has a 'cuisine' field
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food items' });
  }
});

module.exports = router;
