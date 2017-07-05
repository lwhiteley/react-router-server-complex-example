const accountService = require('../services/auth-management/notifier');

module.exports = () => (hook) => {
  if (!hook.params.provider) {
    return hook;
  }

  const user = hook.result;

  if (hook.data && hook.data.email && user) {
    accountService(hook.app)
      .notifier('resendVerifySignup', user)
      .catch((err) => {
        hook.app.error(`cound not send email: ${err.message}`, err);
      });
    return hook;
  }

  return hook;
};
