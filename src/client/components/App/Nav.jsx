import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact (redirect)</Link></li>
        <li><Link to="/images/all">Images</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/logout">Logout</Link></li>
        <li><Link to="/my-account">My Account</Link></li>
        <li><Link to="/404">404</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
