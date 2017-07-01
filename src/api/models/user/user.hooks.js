/**
 * Created by layton on 6/18/17.
 */
const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');

export default (app, data) => {
  app.service(data.apiPath).hooks({
    before: {
      find: [
        auth.hooks.authenticate('jwt'),
      ],
      create: [
        local.hooks.hashPassword({ passwordField: 'password' }),
      ],
    },
  });
};

