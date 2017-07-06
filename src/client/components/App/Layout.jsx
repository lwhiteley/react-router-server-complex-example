import React from 'react';
import PropTypes from 'prop-types';
import DevTools from "mobx-react-devtools"; // eslint-disable-line
import Nav from './Nav';
import './app.css';

const Layout = (props) => {
  const { children } = props;

  return (
    <div>
      <Nav />
      <div className="content">
        {children}
      </div>
      {/* TODO: only show devtool in dev mode */}
      <DevTools />
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.element({}).isRequired,
};
