// src/components/FoodItems.js
import React, { useState } from 'react';
import axios from 'axios';

const FoodItems = ({ foodItems }) => {
  const [cart, setCart] = useState({});

  const handleAddToCart = async (foodId, quantity = 1) => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.post(
        '/api/cart/add', 
        { foodId, quantity },
        { headers: { Authorization: token } } // Add token to request headers
      );
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };
  

  const handleUpdateQuantity = async (foodId, quantity) => {
    if (quantity <= 0) {
      await handleRemoveFromCart(foodId);
    } else {
      try {
        const response = await axios.post('/api/cart/update', { foodId, quantity });
        setCart(response.data);
      } catch (error) {
        console.error('Error updating cart quantity', error);
      }
    }
  };

  const handleRemoveFromCart = async (foodId) => {
    try {
      const response = await axios.post('/api/cart/remove', { foodId });
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart', error);
    }
  };

  return (
    <div>
      {foodItems.map((item) => (
        <div key={item._id} className="food-item">
          <h3>{item.name}</h3>
          <img src={item.image} alt={item.name} />
          <p>Price: ₹{item.price}</p>

          {!cart.items?.find(cartItem => cartItem.foodId._id === item._id) ? (
            <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
          ) : (
            <div>
              <button onClick={() => handleUpdateQuantity(item._id, cart.items.find(cartItem => cartItem.foodId._id === item._id).quantity - 1)}>-</button>
              <span>{cart.items.find(cartItem => cartItem.foodId._id === item._id).quantity}</span>
              <button onClick={() => handleUpdateQuantity(item._id, cart.items.find(cartItem => cartItem.foodId._id === item._id).quantity + 1)}>+</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FoodItems;
