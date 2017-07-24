
import restrictUser from '../../utils/restrict-user';

const _ = require('lodash');
const commonHooks = require('feathers-hooks-common');
const verifyHooks = require('feathers-authentication-management').hooks;
const { hashPassword } = require('feathers-authentication-local').hooks;

const setDefaultRole = require('../../hooks/set-default-role');
const setFirstUserToRole = require('../../hooks/set-first-user-to-role');
const sendVerificationEmail = require('../../hooks/send-verification-email');
const preventDisabledAdmin = require('../../hooks/prevent-disabled-admin');

const restrict = restrictUser();

const schema = {
  include: [
    {
      service: 'roles',
      nameAs: 'access',
      parentField: 'role',
      childField: 'role',
    },
  ],
};

const serializeSchema = {
  computed: {
    permissions: item => _.get(item, 'access.permissions'),
  },
  exclude: ['access', '_include'],
};

function customizeFBProfile() {
  return function setup(hook) {
    if (hook.data.facebook) {
      hook.app.debug('Customizing facebook Profile');
      hook.params.provider = 'facebook';
      const profile = _.get(hook, 'data.facebook.profile._json', {});
      hook.data.email = profile.email;
      hook.data.username = profile.email;
      // hook.data.password = profile.email;
      hook.data.firstName = profile.first_name;
      hook.data.lastName = profile.last_name;
      hook.data.gender = profile.gender;
    }

    return Promise.resolve(hook);
  };
}

module.exports = {
  before: {
    all: [],
    find: [...restrict],
    get: [...restrict],
    create: [
      commonHooks.discard('_id', 'accountNumber'),
      customizeFBProfile(),
      hashPassword(),
      verifyHooks.addVerification(),
      setDefaultRole(),
      setFirstUserToRole({ role: 'admin' }),
      preventDisabledAdmin(),
    ],
    update: [
      ...restrict,
      commonHooks.discard('_id', 'accountNumber'),
      customizeFBProfile(),
      hashPassword(),
      preventDisabledAdmin(),
    ],
    patch: [
      ...restrict,
      commonHooks.discard('_id', 'accountNumber'),
      preventDisabledAdmin(),
    ],
    remove: [...restrict],
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard(
          '__v',
          'password',
          '_computed',
          'verifyExpires',
          'resetExpires',
          'verifyChanges'
        )
      ),
    ],
    find: [
      commonHooks.populate({ schema }),
      commonHooks.serialize(serializeSchema),
    ],
    get: [
      commonHooks.populate({ schema }),
      commonHooks.serialize(serializeSchema),
    ],
    create: [sendVerificationEmail(), verifyHooks.removeVerification()],
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
