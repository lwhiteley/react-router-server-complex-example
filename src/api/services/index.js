const authManagement = require('./auth-management');
const email = require('./email');
const authentication = require('./authentication');

export default () =>
  function services() {
    const app = this; // eslint-disable-line no-unused-vars
    app.configure(authentication);
    app.configure(authManagement);
    app.configure(email);
  };
