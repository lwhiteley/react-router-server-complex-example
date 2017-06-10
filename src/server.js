import React from 'react';
import { renderToString, extractModules } from 'react-router-server';
import { StaticRouter } from 'react-router';

import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import requestIp from 'request-ip';
import morgan from 'morgan';
import cuid from 'cuid';
import path from 'path';
import serveStatic from 'serve-static';

import feathers from 'feathers';
import rest from 'feathers-rest';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio';
import logger from 'feathers-logger';
// import errors from 'feathers-errors';
import handler from 'feathers-errors/handler';
import configuration from 'feathers-configuration';

import App from '../build/server/app';
import winston from './logger';
import api from './api';
import stats from '../build/public/stats.json';

mongoose.Promise = global.Promise;

const app = feathers()
  .configure(configuration(__dirname))
  .configure(logger(winston));

mongoose.connect(app.get('dbConnectionString'));
app.use(requestIp.mw());
app.use((req, res, next) => {
  req.id = cuid();
  req.app = app;
  req.logContext = {
    clientIp: req.clientIp,
    reqId: req.id,
  };
  next();
});

app.use(morgan(app.get('morgan').format, app.get('morgan').options));

  // Enable Socket.io
app.configure(socketio())
  .use(compression())
  .use(methodOverride())
  .use(bodyParser.json({ limit: '20mb' }))
  .use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
  // Enable REST services
  .configure(rest())
  .configure(hooks())
  .use(serveStatic(path.join(__dirname, '..', 'build', 'public')));

// Configure api with mongoose models
api(app);

// app.use(`${config.apiBasePath}`, (req, res) => {
//   const notFound = new errors.NotFound('not found');
//   res.status(404).send(notFound);
// });

app.get('/*', (req, res) => {
  if (req.url) {
    const context = {};
    const server = (
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    );

    renderToString(server)
      .then(({ html, state, modules }) => {
        if (context.url) {
          res.writeHead(302, {
            Location: context.url,
          });
          res.end();
        } else {
          const extracted = extractModules(modules, stats);
          res.render(
            path.join(__dirname, '..', 'index.ejs'),
            {
              html,
              state,
              files: extracted.map(module => module.files),
              modules: extracted,
            }
          );
        }
      })
      .catch(err => req.app.error(err));
  }
});

app.use(handler());
const port = app.get('port');
app.listen(port, () => {
  app.info(`site listening on http://localhost:${port}`);
});

export default app;
