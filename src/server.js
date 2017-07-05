import mongoose from 'mongoose';

import feathers from 'feathers';
import rest from 'feathers-rest';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio';
import logger from 'feathers-logger';
import authentication from 'feathers-authentication';
// import errors from 'feathers-errors';
import handler from 'feathers-errors/handler';
import notFound from 'feathers-errors/not-found';

import local from 'feathers-authentication-local';
import jwt from 'feathers-authentication-jwt';
import swagger from 'feathers-swagger';
import configuration from 'feathers-configuration';

import api from './api';
import winston from './logger';
import services from './api/services';

mongoose.Promise = global.Promise;

const app = feathers()
  .configure(configuration(__dirname))
  .configure(logger(winston));

mongoose.connect(app.get('dbConnectionString'));

// Enable Socket.io
app
  .configure(rest())
  .use((req, res, next) => {
    req.feathers.context = req.context;
    next();
  })
  .configure(socketio())
  .configure(hooks())
  .configure(authentication(app.get('authentication')))
  .configure(local())
  .configure(jwt())
  .configure(services())
  .configure(swagger(app.get('swagger')))
  .configure(api());

app.use(notFound()).use(handler());

export default app;
