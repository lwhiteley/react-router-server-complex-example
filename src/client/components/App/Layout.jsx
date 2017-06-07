import React, { Component } from 'react';
import './app.css';
import DevTools from 'mobx-react-devtools';
import Nav from './Nav';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div> 
        <Nav />
        <div className="content">
          { children }
        </div>
        {/* TODO: only show devtool in dev mode */}
        <DevTools />
      </div>
    )
  }
}

export default Layout;
