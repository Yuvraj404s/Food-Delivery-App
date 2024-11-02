// src/components/Cuisine.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodItems from './FoodItems';

const Cuisine = ({ cuisine }) => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Fetch food items based on the selected cuisine
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`/api/cuisine/${cuisine}`);
        setFoodItems(response.data.foodItems); // Assuming response contains the food items
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, [cuisine]);

  return (
    <div>
      <h2>{cuisine} Cuisine</h2>
      {foodItems.length > 0 ? (
        <FoodItems items={foodItems} />
      ) : (
        <p>No food items available for this cuisine.</p>
      )}
    </div>
  );
};

export default Cuisine;
