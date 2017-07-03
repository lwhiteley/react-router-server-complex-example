const authManagement = require('./auth-management/auth-management.service.js');
const email = require('./email/email.service.js');

export default () =>
  function services() {
    const app = this; // eslint-disable-line no-unused-vars
    app.configure(authManagement);
    app.configure(email);
  };
