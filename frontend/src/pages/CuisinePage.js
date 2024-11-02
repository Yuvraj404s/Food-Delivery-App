// src/pages/CuisinePage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CuisinePage = () => {
  const { cuisine } = useParams();  // Get cuisine from the URL
  const [foodItems, setFoodItems] = useState([]);  // State to store food items
  const [loading, setLoading] = useState(true);    // Loading state

  useEffect(() => {
    // Fetch food items when the page loads
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/food/${cuisine}`);
        setFoodItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food items:', error);
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [cuisine]);

  if (loading) {
    return <div>Loading food items...</div>;
  }

  return (
    <div>
      <h1>{cuisine} Cuisine</h1>
      <div>
        {foodItems.length > 0 ? (
          foodItems.map((food) => (
            <div key={food._id}>
              <h2>{food.name}</h2>
              <img src={food.imageUrl} alt={food.name} />
              <p>Price: ₹{food.price}</p>
              <button>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No food items found for this cuisine.</p>
        )}
      </div>
    </div>
  );
};

export default CuisinePage;
