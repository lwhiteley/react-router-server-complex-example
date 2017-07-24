import feathers from 'feathers';
import React from 'react';
import { renderToString, extractModules } from 'react-router-server';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';

import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import requestIp from 'request-ip';
import morgan from 'morgan';
import path from 'path';

import logger from 'feathers-logger';

import configuration from 'feathers-configuration';

import api from './server';
import middlewares from './middlewares';
import winston from './logger';
import App from '../build/server/app';
import stats from '../build/public/stats.json';

const app = feathers()
  .configure(configuration(__dirname))
  .configure(logger(winston));

const morganSettings = app.get('morgan');
const port = app.get('port');

app.use(morgan(morganSettings.format, morganSettings.options));

app.use(requestIp.mw());

app
  .use(compression())
  .use(methodOverride())
  .use(bodyParser.json({ limit: '20mb' }))
  .use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
  .use(feathers.static(path.join(__dirname, '..', 'build', 'public')));

app.configure(middlewares.reqContext());

app.use(app.get('apiPrefix') || '/api', api);

app.get('/*', (req, res) => {
  if (req.url) {
    const context = {};
    const server = (
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );

    renderToString(server)
      .then(({ html, state, modules }) => {
        const head = Helmet.rewind();
        if (context.url) {
          res.writeHead(302, {
            Location: context.url,
          });
          res.end();
        } else {
          const extracted = extractModules(modules, stats);
          res.render(path.join(__dirname, '..', 'index.ejs'), {
            html,
            head,
            state,
            files: [...extracted.map(module => module.files)],
            modules: extracted,
          });
        }
      })
      .catch(err => app.error(err));
  }
});

const init = () => {
  const server = app.listen(port, () => {
    app.info('--------------------------');
    app.info(`site listening on http://localhost:${port}`);
    app.info('--------------------------\n');
  });
  api.setup(server);
  return app;
};
export default init();
