// Initializes the `authManagement` service on path `/authManagement`
import authentication from 'feathers-authentication';
import local from 'feathers-authentication-local';
import jwt from 'feathers-authentication-jwt';

const hooks = require('./authentication.hooks');

module.exports = function setup() {
  const app = this;

  // Initialize our service with any options it requires
  app
    .configure(authentication(app.get('authentication')))
    .configure(local())
    .configure(jwt());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('authentication');

  service.hooks(hooks);
};
