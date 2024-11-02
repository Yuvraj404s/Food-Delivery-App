import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link> {/* Link to Home page */}
        </li>
        <li>
          <Link to="/login">Login</Link> {/* Link to Login page */}
        </li>
        <li>
          <Link to="/signup">Signup</Link> {/* Link to Register page */}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
