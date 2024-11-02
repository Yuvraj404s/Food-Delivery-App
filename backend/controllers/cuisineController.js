const Cuisine = require('../models/Cuisine');
const FoodItem = require('../models/FoodItem');

// Fetch all cuisines
exports.getAllCuisines = async (req, res) => {
  try {
    const cuisines = await Cuisine.find();
    res.json(cuisines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cuisines' });
  }
};

// Get food items of a specific cuisine
exports.getFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ cuisine: req.params.id });
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
};
