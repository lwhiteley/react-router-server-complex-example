import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Helmet from 'react-helmet';

import formSetup from './formSetup';
import Form from '../BaseForm';
import FormLogin from './FormMyAccount';
// import client from '../../helpers/rest-client';
import storage from '../../helpers/simple-storage';
import constants from '../../constants';

const name = 'MyAccountForm';
const logger = require('./client-logger')(name);

class MyAccountFormHandler extends Form {
  setup() {
    const values = storage.getItem(constants.storageKeys.currentUser);
    return { values };
  }
  onSuccess(form) {
    const values = form.values();
    logger.info(values, 'Form Values', form.name);
  }
  onError(form) {
    logger.info(form.errors(), 'Form Errors', form.name);
  }
}


// const populatedSetup = formValueSetter(formSetup, user);

const MyAccountForm = new MyAccountFormHandler({ ...formSetup }, { name });

@observer
export default class MyAccount extends Component {
  constructor(props) {
    super(props);
    MyAccountForm.router = this.props.history;
  }
  render() {
    return (
      <div>
        <Helmet title={'My Account'} />
        <FormLogin form={MyAccountForm} />
      </div>
    );
  }
}

MyAccount.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
