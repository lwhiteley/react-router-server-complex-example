import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Helmet from 'react-helmet';
import get from 'lodash/get';

export default class SignupSuccess extends Component {
  constructor(props) {
    super(props);
    this.user = get(this.props.location, 'state.user');
    if (!user) {
        this.props.history.push({
            pathname: '/',
        })
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
