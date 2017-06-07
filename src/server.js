import React from 'react';
import App from '../build/server/app';
import { renderToString, extractModules } from 'react-router-server';
import { StaticRouter } from 'react-router';
import express from 'express';
import path from 'path';
import stats from '../build/public/stats.json';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import api from './api';
import config from './config';

mongoose.Promise = global.Promise;
mongoose.connect(config.dbConnectionString);

const app = express();
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(methodOverride())
app.use(express.static(path.join(__dirname, '..', 'build', 'public')));
app.use(api);

app.get('/*', function (req, res) {
  if (req.url) {
    const context = {}
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
            Location: context.url
          })
          res.end()
        } else {
          const extracted = extractModules(modules, stats);
          res.render(
            path.join(__dirname, '..', 'index.ejs'),
            {
              html,
              state,
              files: [].concat.apply([], extracted.map(module => module.files)),
              modules: extracted
            }
          );
        }
      })
      .catch(err => console.error(err));
  }
});

app.listen(3000, function () {
  console.log('site listening on http://localhost:3000');
});
