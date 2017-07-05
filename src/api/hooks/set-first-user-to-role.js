const _ = require('lodash');
const { getItems } = require('feathers-hooks-common');

module.exports = options => hook =>
  new Promise((resolve, reject) => {
    const logger = hook.app.get('logger');
    hook.app.service('users').find({ query: {} }).then(
      (found) => {
        logger.info('Checking if first user');
        if (!Array.isArray(found) && found.data) {
          found = found.data;
        }

        if (found.length === 0) {
          const firstUser = _.castArray(getItems(hook))[0];

          firstUser.role = options.role || 'admin';
          logger.info('set role to admin');
        }

        return resolve(hook);
      },
      (err) => {
        return reject(err);
      }
    );
  });
