import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';


const Cart = () => {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleOrder = () => {
    if (address) {
      // Proceed to payment
      navigate('/payment');
    } else {
      alert('Please enter address');
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {/* Cart items logic */}
      <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Delivery Address" />
      <button onClick={handleOrder}>Proceed to Payment</button>
    </div>
  );
};

export default Cart;
