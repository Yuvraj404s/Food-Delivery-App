// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart', error);
      }
    };

    fetchCart();
  }, []);

  if (!cart) {
    return <p>Loading cart...</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.length > 0 ? (
        cart.items.map(item => (
          <div key={item.foodId._id} className="cart-item">
            <h3>{item.foodId.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ₹{item.foodId.price}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
