import notifyHandler from './notify-handler';

module.exports = function setup(app) {
  return {
    notifier: (type, user, notifierOptions) => {
      return notifyHandler(app, type, user, notifierOptions)
      .then((emailData) => {
        const email = Object.assign(emailData, {
          from: `${app.get('name')}<${app.get('adminEmail')}>`,
          to: user.email,
        });
        return app.sendEmail(email);
      });
    },
  };
};
