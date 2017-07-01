/**
 * Created by layton on 6/18/17.
 */
const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');
const { discard } = require('feathers-hooks-common');

export default (app, data) => {
  app.service('users').after(discard('password', 'salt'));

  app.service(data.apiPath).hooks({
    before: {
      find: [
        auth.hooks.authenticate('jwt'),
      ],
      update: discard('_id', 'accountNumber'),
      patch: discard('_id', 'accountNumber'),
      create: [
        discard('_id', 'accountNumber'),
        local.hooks.hashPassword({ passwordField: 'password' }),
      ],
    },
  });
};

