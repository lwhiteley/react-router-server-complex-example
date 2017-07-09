const _ = require('lodash');

module.exports = function hasPermissionBoolean(permission) {
  return function setup(hook) {
    if (!hook.params.provider) {
      return true;
    }

    if (_.get(hook, 'params.user.role') === 'admin') {
      return true;
    }

    if (
      !_.get(hook, 'params.user.permissions') ||
      !hook.params.user.permissions.includes(permission)
    ) {
      return false;
    }

    return true;
  };
};
