import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
        <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact (redirect)</Link></li>
            <li><Link to="/images/all">Images</Link></li>
            <li><Link to="/404">404</Link></li>
            </ul>
        </nav>
    )
  }
}

export default Nav;
