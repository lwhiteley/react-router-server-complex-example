const { authenticate } = require('feathers-authentication').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;
const pick = require('lodash/pick');

module.exports = {
  before: {
    all: [
      // authenticate(['local', 'jwt']),
    ],
    find: [],
    get: [],
    create: [
      authenticate(['local']),
      verifyHooks.isVerified(),
    ],
    update: [],
    patch: [],
    remove: [
      authenticate(['jwt', 'local']),
    ],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      (hook) => {
        hook.params.user = pick(hook.params.user, [
          '_id',
          'email',
          'username',
          'accountNumber',
          'cellphone',
          'isVerified',
          'isEnabled',
          'role',
          'firstName',
          'lastName',
        ]);
        return Promise.resolve(hook);
      },
      (hook) => {
        hook.result.user = hook.params.user;
        return Promise.resolve(hook);
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
