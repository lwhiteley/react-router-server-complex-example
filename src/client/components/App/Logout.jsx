import React, { Component } from 'react';
import PropTypes from 'prop-types';

import client from '../../helpers/rest-client';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    client.logout();
    return this.props.history.replace({
      pathname: '/',
    });
  }
  render() {
    return (
      <div />
    );
  }
}

Logout.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};
