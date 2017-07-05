const _ = require('lodash');
const { getItems } = require('feathers-hooks-common');
const { to } = require('../utils/to');

module.exports = function setDeefaultRole() {
  return function setup(hook) {
    return new Promise(async (resolve) => {
      const logger = hook.app.get('logger');
      if (hook.data) {
        const [err, defaultRoleFound] = await to(
          hook.app.service('settings').find({ name: 'defaultRole' })
        );
        let defaultRole = defaultRoleFound;

        if (!err) {
          defaultRole = _.get(defaultRole, '0');
          const role = _.get(defaultRole, 'value.role') || 'basic';

          _.castArray(getItems(hook)).forEach((item) => {
            item.role = role;
          });
        } else {
          logger.error('Error setting default role', err);
        }

        resolve(hook);
      }
    });
  };
};
