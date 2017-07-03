const _ = require('lodash');
const patterns = require('../patterns');

module.exports = (key) => {
  return {
    validator: (v) => {
      return _.get(patterns, key).test(v);
    },
    message: _.get(patterns, `messages.${key}`),
  };
};

exports.patterns = patterns;
