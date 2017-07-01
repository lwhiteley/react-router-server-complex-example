import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { preload } from 'react-router-server';
import App from './app';

preload(__INITIAL_MODULES__)
  .then(() => {
    render((
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ), document.getElementById('main'));
  });
