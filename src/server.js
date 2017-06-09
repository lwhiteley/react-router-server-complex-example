import React from 'react';
import App from '../build/server/app';
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
import winston from './logger';
import api from './api';
import config from './config/server';
import stats from '../build/public/stats.json';
import serveStatic from 'serve-static';

import feathers from 'feathers';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';
import logger from 'feathers-logger';
import handler from 'feathers-errors/handler';

mongoose.Promise = global.Promise;
mongoose.connect(config.dbConnectionString);

const app = feathers()
  .configure(logger(winston));

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

app.use(morgan(config.logger.format, config.logger.options));

  // Enable Socket.io
app.configure(socketio())
  .use(compression())
  .use(methodOverride())
  .use(bodyParser.json({ limit: '20mb' }))
  .use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
  // Enable REST services
  .configure(rest())
  .use(serveStatic(path.join(__dirname, '..', 'build', 'public')));

// Configure api with mongoose models
api(app)

app.get('/*', function (req, res) {
  if (req.url) {
    const context = {};
    const server = (
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App/>
      </StaticRouter>
    );

    renderToString(server)
      .then(({ html, state, modules }) => {
        if (context.url) {
          res.writeHead(302, {
            Location: context.url,
          })
          res.end();
        } else {
          const extracted = extractModules(modules, stats);
          res.render(
            path.join(__dirname, '..', 'index.ejs'),
            {
              html,
              state,
              files: [].concat.apply([], extracted.map(module => module.files)),
              modules: extracted,
            }
          );
        }
      })
      .catch(err => req.app.error(err));
  }
});

app.use(handler());
app.listen(config.port, function () {
  app.info(`site listening on http://localhost:${config.port}`);
});

export default app;
