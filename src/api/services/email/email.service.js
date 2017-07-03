// Initializes the `email` service on path `/email`
const hooks = require('./email.hooks');
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function emailService() {
  const app = this;
  // const paginate = app.get('paginate');

  // Initialize our service with any options it requires
  app.use('/emails', Mailer(smtpTransport(app.get('mailer'))));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('emails');

  app.sendEmail = (email) => {
    return service.create(email)
      .then((result) => {
        app.logger.info('Sent email', result);
        return result;
      })
      .catch((err) => {
        app.logger.error('Error sending email', err);
        return err;
      });
  };

  service.hooks(hooks);
};
