import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import get from 'lodash/get';

export default class SignupSuccess extends Component {
  constructor(props) {
    super(props);
    this.user = get(this.props.location, 'state.user');
    if (!this.user) {
      this.props.history.push({
        pathname: '/',
      });
    }
  }
  render() {
    return (
      <div>
        <Helmet title={'Signup Success'} />
        <div> success {this.user.firstName} </div>
      </div>
    );
  }
}

SignupSuccess.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
};
