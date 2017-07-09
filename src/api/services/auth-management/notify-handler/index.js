import React from 'react';
import { renderToString } from 'react-dom/server';
import { GeneralError } from 'feathers-errors';
import Promise from 'bluebird';
import getLink from '../../../utils/get-link';
import handlers from './handlers';

export default (app, type, user = {}, notifierOptions = {}) => {
  const handler = handlers[type];
  if (!handler) {
    return Promise.reject(
      new GeneralError(
        `Notify Failed => Template/Data could not be found for type: ${type}`
      )
    );
  }

  app.info(`Preparing email for ${type}`);
  const { subject, tokenKey, path } = handler.data;
  const urlPath = path || type;
  const hashLink = getLink(app, urlPath, user[tokenKey]);
  const Template = handler.Template;
  const adminEmail = app.get('adminEmail');
  const html = renderToString(
    <Template
      data={{
        hashLink,
        user,
        type,
        notifierOptions,
        meta: handler.data,
        adminEmail,
      }}
    />
  );

  return Promise.resolve({
    html,
    subject,
  });
};
