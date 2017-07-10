import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Helmet from 'react-helmet';

import formSetup from './formSetup';
import Form from '../BaseForm';
import FormLogin from './FormLogin';
import client from '../../helpers/rest-client';
import storage from '../../helpers/simple-storage';
import constants from '../../constants';

const name = 'LoginForm';
const logger = require('./client-logger')(name);

class LoginFormHandler extends Form {
  onSuccess(form) {
    const values = form.values();
    logger.info(form.values(), 'Form Values', form.name);
    client
      .authenticate({
        strategy: 'local',
        email: values.email,
        password: values.password,
      })
      .then((token) => {
        logger.info(token, 'authenticated');
        const user = token.user;

        if (!user) {
          const error = new Error('No user returned.');
          // logger.error(error);
          client.logout();
          throw error;
        }
        if (!user.isVerified) {
          const error = new Error('User\'s email is not verified.');
          // logger.error(error);
          client.logout();
          throw error;
        }
        storage.setItem(constants.storageKeys.currentUser, user);
        return form.router.push({
          pathname: '/',
          state: {
            user,
          },
        });
      })
      .catch((err) => {
        logger.error({ err }, 'Error authenticating!');
      });
  }
  onError(form) {
    logger.info(form.errors(), 'Form Errors', form.name);
  }
}

const LoginForm = new LoginFormHandler({ ...formSetup }, { name });

@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    LoginForm.router = this.props.history;
  }
  render() {
    return (
      <div>
        <Helmet title={'Login'} />
        <FormLogin form={LoginForm} />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
