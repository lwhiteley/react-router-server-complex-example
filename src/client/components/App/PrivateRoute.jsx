import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import {
    Route,
    Redirect,
} from 'react-router-dom';

import storage from '../../helpers/simple-storage';
import constants from '../../constants';

const renderRedirect = (props) => {
  return (
    <Redirect to={{
      pathname: '/login',
      state: { from: props.location },
    }}
    />
  );
};

const PrivateRoute = ({ component: Component, render, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (process.env.RUNTIME_ENV === 'server') {
          return null;
        }
        const user = storage.getItem(constants.storageKeys.currentUser, {});

        if (Array.isArray(roles) &&
            user.role !== 'admin' &&
            !includes(roles, user.role)) {
          return renderRedirect(props);
        }
        const rendered = render ? render() : <Component {...props} />;
        return (
              !isEmpty(user)
                  ? rendered
                  : renderRedirect(props)
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
  roles: PropTypes.arrayOf(PropTypes.string),
};

renderRedirect.propTypes = {
  location: PropTypes.shape({}),
};
