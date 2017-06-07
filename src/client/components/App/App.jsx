import React, { Component } from 'react';
import Router from './Router';
import { Link } from 'react-router-dom';
import './app.css';
import DevTools from 'mobx-react-devtools';

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact (redirect)</Link></li>
            <li><Link to="/images/all">Images</Link></li>
            <li><Link to="/404">404</Link></li>
          </ul>
        </nav>
        <div className="content">
          <Router />
        </div>
        <DevTools />
      </div>
    )
  }
}

export default App;
