import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Helmet from 'react-helmet';

import registerSimple from './registerSimple';
import Form from '../BaseForm';
import FormRegisterSimple from './FormRegisterSimple';
import client from '../../helpers/rest-client';

const name = 'RegisterForm';
const logger = require('./client-logger')(name);

class RegisterSimpleForm extends Form {
  onSuccess(form) {
    const values = form.values();
    logger.info(form.values(), 'Form Values', form.name);
    client
      .service('users')
      .create(values)
      .then((user) => {
        logger.info(user);
        form.router.push({
          pathname: '/signup/success',
          state: {
            user,
          },
        });
      })
      .catch((err) => {
        logger.error(err);
      });
  }
  onError(form) {
    logger.info(form.errors(), 'Form Errors', form.name);
  }
}

const SignUpForm = new RegisterSimpleForm({ ...registerSimple }, { name });

@observer
export default class Signup extends Component {
  constructor(props) {
    super(props);
    SignUpForm.router = this.props.history;
  }
  render() {
    return (
      <div>
        <Helmet title={'Sign up'} />
        <FormRegisterSimple form={SignUpForm} />
      </div>
    );
  }
}
