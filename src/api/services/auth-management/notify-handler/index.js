import React from 'react';
import { renderToString } from 'react-dom/server';
import { GeneralError } from 'feathers-errors';
import Promise from 'bluebird';
import getLink from '../../../utils/get-link';

import resendVerifySignup from './resend-verify-signup';
import verifySignup from './verify-signup';

const Handlers = {
  resendVerifySignup,
  verifySignup,
};

export default (app, type, user = {}, notifierOptions = {}) => {
  const handler = Handlers[type];
  if (!handler) {
    return Promise.reject(
      new GeneralError(
        `Notify Failed => Template/Data could not be found for type: ${type}`
      )
    );
  }

  app.info(`Preparing email for ${type}`);
  const { subject, tokenKey, appPath } = handler.data;
  const urlPath = appPath || type;
  const hashLink = getLink(app, urlPath, user[tokenKey]);
  const Template = handler.Template;
  const html = renderToString(
    <Template
      data={{
        hashLink,
        user,
        type,
        notifierOptions,
        meta: handler.data,
      }}
    />
  );

  return Promise.resolve({
    html,
    subject,
  });
};
