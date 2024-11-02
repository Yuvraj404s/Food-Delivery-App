// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const cuisines = [
    { name: 'Italian', image: 'italian.jpg' },
    { name: 'Chinese', image: 'chinese.jpg' },
    { name: 'North Indian', image: 'north_indian.jpg' },
    { name: 'South Indian', image: 'south_indian.jpg' },
    { name: 'Korean', image: 'korean.jpg' },
    // Add more cuisines as needed
  ];

  const navigate = useNavigate();

  const handleCuisineClick = (cuisineName) => {
    navigate(`/cuisine/${cuisineName}`);
  };

  return (
    <div>
      <h1>Welcome to the Restaurant</h1>
      <p>Select a cuisine to explore our menu.</p>
      <div>
        {cuisines.map((cuisine) => (
          <div key={cuisine.name} onClick={() => handleCuisineClick(cuisine.name)}>
            <h2>{cuisine.name}</h2>
            <img src={cuisine.image} alt={cuisine.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
