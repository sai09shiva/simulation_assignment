import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-link">
        <li>Home</li>
      </Link>
      <Link to="/addscenario" className="navbar-link">
        <li>Add Scenario</li>
      </Link>
      <Link to="/allscenario" className="navbar-link">
        <li>All Scenario's</li>
      </Link>
      <Link to="/addvehicle" className="navbar-link">
        <li>Add Vehicle</li>
      </Link>
    </div>
  );
}
