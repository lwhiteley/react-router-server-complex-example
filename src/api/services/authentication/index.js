import authentication from 'feathers-authentication';
import local from 'feathers-authentication-local';
import jwt from 'feathers-authentication-jwt';
import CustomVerifier from './helpers/CustomVerifier';

const oauth2 = require('feathers-authentication-oauth2');
const FacebookStrategy = require('passport-facebook').Strategy;

const hooks = require('./authentication.hooks');

module.exports = function setup() {
  const app = this;
  const config = app.get('authentication');
  const fbOAuth = oauth2(Object.assign({
    name: 'facebook',
    Strategy: FacebookStrategy,
    Verifier: CustomVerifier,
  }, config.facebook));

  // Initialize our service with any options it requires
  app
    .configure(authentication(config))
    .configure(local())
    .configure(jwt())
    .configure(fbOAuth);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('authentication');

  service.hooks(hooks);
};
