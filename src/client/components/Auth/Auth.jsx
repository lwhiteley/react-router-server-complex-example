import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import VerifyEmail from './VerifyEmail';
import NoMatch from '../NoMatch';

@inject('authManagement')
@observer
export default class Auth extends Component {
  render() {
    let Display;
    switch (this.props.match.params.action) {
      case 'verify-email':
        Display = VerifyEmail;
        break;
      case 'reset-password':
        Display = VerifyEmail;
        break;
      default:
        Display = NoMatch;
        break;
    }
    return <Display {...this.props} />;
  }
}

Auth.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      action: PropTypes.string,
    }),
  }).isRequired,
};
