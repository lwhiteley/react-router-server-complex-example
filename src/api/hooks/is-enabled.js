// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const _ = require('lodash');
const errors = require('feathers-errors');

module.exports = function isEnabled(options = {}) { // eslint-disable-line no-unused-vars
  return function setup(hook) {
    if (!hook.params.provider) {
      return Promise.resolve(hook);
    }

    if (_.get(hook, 'params.user.role') === 'admin') {
      // hook.app.debug('user is in admin role, bypassing isEnabled');
      return Promise.resolve(hook);
    }

    if (!_.get(hook, 'params.user') || _.isEmpty(hook.params.user)) {
      throw new errors.NotAuthenticated(
        'Cannot check if the user is enabled. You must not be authenticated.'
      );
    } else if (!_.get(hook, 'params.user.isEnabled')) {
      const name =
        _.get(hook, 'params.user.name') ||
        _.get(hook, 'params.user.email') ||
        'This user ';

      throw new errors.Forbidden(`${name} is disabled.`);
    }
    return Promise.resolve(hook);
  };
};
