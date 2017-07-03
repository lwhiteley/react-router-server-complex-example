/* eslint no-console: 1 */
console.warn( // eslint-disable-line no-console
  'You are using the default filter for the settings service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'
);

module.exports = function setup(data, connection, hook) { // eslint-disable-line no-unused-vars
  return data;
};
