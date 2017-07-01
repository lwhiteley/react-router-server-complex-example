import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import feathers from 'feathers';
import rest from 'feathers-rest';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio';
import logger from 'feathers-logger';
import authentication from 'feathers-authentication';
import authManagement from 'feathers-authentication-management';
// import errors from 'feathers-errors';
import handler from 'feathers-errors/handler';

import local from 'feathers-authentication-local';
import jwt from 'feathers-authentication-jwt';
import swagger from 'feathers-swagger';
import configuration from 'feathers-configuration';

import api from './api';
import winston from './logger';

mongoose.Promise = global.Promise;

const app = feathers()
  .configure(configuration(__dirname))
  .configure(logger(winston));

mongoose.connect(app.get('dbConnectionString'));

app
  .use(bodyParser.json({ limit: '20mb' }))
  .use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

// Enable Socket.io
app
  .configure(rest())
  .configure(socketio())
  .configure(hooks())
  .configure(authentication({ secret: 'supersecret' }))
  .configure(local())
  .configure(jwt())
  .configure(authManagement({}))
  // Enable REST services
  .configure(
    swagger({
      docsPath: '/docs',
      info: {
        title: 'A test',
        description: 'A description',
      },
    })
  )
  .configure(api());

// app.use(`${config.apiBasePath}`, (req, res) => {
//   const notFound = new errors.NotFound('not found');
//   res.status(404).send(notFound);
// });

app.use(handler());

export default app;
