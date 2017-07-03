// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require('feathers-errors');
const _ = require('lodash');
const to = require('../utils/to');

module.exports = (options = {}) => { // eslint-disable-line no-unused-vars
  return async (hook) => {
    const defaults = {
      queryField: 'email',
    };

    const config = Object.assign(defaults, options);

    if (!hook.params.provider) {
      return hook;
    }

    if (!hook.data.email) {
      throw new errors.BadRequest(
        'You must provide an email to authenticate a user'
      );
    }

    const query = {};
    query[config.queryField] = _.get(hook.data, config.queryField);

    const [err, found] = await to(hook.app.service('users').find({ query }));

    const user = _.get(found, 'data.0') || _.get(found, '0');

    if (err) {
      throw new errors.GeneralError('Error searching users.');
    } else if (user) {
      const name = _.get(user, 'name') || _.get(user, 'email');

      if (user.isEnabled === true || user.isEnabled === 'true') {
        return hook;
      }
      throw new errors.Forbidden(`${name} is disabled.`);
    } else {
      throw new errors.NotFound(
        `A user matching ${_.get(hook.data, config.queryField)} could not be found.`
      );
    }
  };
};
