import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication-client';
import constants from '../constants';

const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const axios = require('axios');

const app = feathers()
  .configure(rest(constants.baseApi).axios(axios))
  .configure(hooks())
  .configure(authentication({ storage: window.localStorage }));

export default app;

