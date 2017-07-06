import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';

@inject('authManagement')
@observer
export default class VerifyEmail extends Component {
  render() {
    const { authManagement, match } = this.props;

    if (!authManagement.emailVerified && !authManagement.error) {
      authManagement.verifySignupLong(match.params.token);
    }

    if (authManagement.loading) {
      return (
        <div>
          <span className={'fa fa-spinner fa-pulse fa-3x fa-fw'} />
        </div>
      );
    }

    return (
      <div>
        <Helmet title={'Verify Email'} />
        <div> verify {authManagement.emailVerified.toString()}</div>
      </div>
    );
  }
}

VerifyEmail.propTypes = {
  authManagement: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};
