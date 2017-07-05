import validatorjs from 'validatorjs';

import MobxReactForm from 'mobx-react-form';

import bindings from './bindings';
import dvrExtend from './extension/dvr';
// import svkExtend from './extension/svk';
import './components/style';

const logger = require('./client-logger')('BaseForm');

export default class Form extends MobxReactForm {
  plugins() {
    return {
      dvr: {
        package: validatorjs,
        extend: dvrExtend,
      },
    };
  }

  options() {
    return {
      defaultGenericError: 'Invalid Data',
      autoParseNumbers: true,
    };
  }

  bindings() {
    return bindings;
  }

  onInit() {
    // override default bindings for all text inputs
    // eslint-disable-next-line
    (this.name === 'Register Material') &&
      this.each(field => field.type === 'text' &&
        field.set('bindings', 'MaterialTextField'));
  }

  onSuccess(form) {
    logger.warn(form, 'Not Implemented');
  }

  onError(form) {
    logger.warn(form, 'Not Implemented');
  }
}
