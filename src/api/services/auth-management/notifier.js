import errors from 'feathers-errors';
import Promise from 'bluebird';
import { isFunction } from 'lodash';
import notifyHandlers from './notify-handlers';

// const isProd = process.env.NODE_ENV === 'production';
// const returnEmail = process.env.COMPLAINT_EMAIL;

module.exports = function setup(app) {
  // const returnEmail = app.get('complaint_email') || process.env.COMPLAINT_EMAIL;

  // function getLink(type, hash) {
  //   const port = app.get('port');
  //   const portTxt = port === '80' || isProd ? '' : `:${port}`;
  //   const host = app.get('host');
  //   const protocol = app.get('protocol') || 'http';
  //   return `${protocol}://${host}${portTxt}/auth/user/${type}/${hash}`;
  // }

  return {
    notifier: (type, user, notifierOptions) => {
      const handler = notifyHandlers[type];

      if (!isFunction(handler)) {
        app.logger.info(`could not find notify handler for type: ${type}`);
        return Promise.reject(new errors.GeneralError('Unknown Notifier handler'));
      }

      app.logger.info(`-- Preparing email for ${type}`);
      const emailData = handler(app, type, user, notifierOptions);
      return app.sendEmail(emailData);
    },
  };
};
