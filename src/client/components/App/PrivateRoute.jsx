import React from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    Redirect,
} from 'react-router-dom';

import storage from '../../helpers/simple-storage';

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (process.env.RUNTIME_ENV === 'server') {
          return null;
        }
        const rendered = render ? render() : <Component {...props} />;
        return (
              storage.getItem('feathers-jwt') ? (
                  rendered
              ) : (
                <Redirect to={{
                  pathname: '/login',
                  state: { from: props.location },
                }}
                />
              )
        );
      }}
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.element,
  location: PropTypes.shape({}),
  render: PropTypes.func,
};
