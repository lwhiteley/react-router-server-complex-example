import mongoose from 'mongoose';

import feathers from 'feathers';
import rest from 'feathers-rest';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio';
import logger from 'feathers-logger';
import sync from 'feathers-sync';
import handler from 'feathers-errors/handler';
import notFound from 'feathers-errors/not-found';
import swagger from 'feathers-swagger';
import configuration from 'feathers-configuration';

import api from './api';
import winston from './logger';
import services from './api/services';

mongoose.Promise = global.Promise;

const app = feathers()
  .configure(configuration(__dirname))
  .configure(logger(winston));
const mongoConnectionString = app.get('dbConnectionString');

mongoose.connect(mongoConnectionString);

app
  .configure(rest())
  .use((req, res, next) => {
    req.feathers.context = req.context;
    next();
  })
    .configure(hooks())
  .configure(socketio())
    .configure(sync({
      db: mongoConnectionString,
      collection: 'syncEvents',
    }))
  .configure(services())
  .configure(swagger(app.get('swagger')))
  .configure(api());

app.use(notFound()).use(handler());

export default app;
