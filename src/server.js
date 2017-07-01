import mongoose from 'mongoose';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import requestIp from 'request-ip';
import morgan from 'morgan';

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
import { reqContext } from './middlewares';
import winston from './logger';

mongoose.Promise = global.Promise;

const app = feathers()
  .configure(configuration(__dirname))
  .configure(logger(winston));

mongoose.connect(app.get('dbConnectionString'));

const morganSettings = app.get('morgan');

app
  .use(compression())
  .use(methodOverride())
  .use(bodyParser.json({ limit: '20mb' }))
  .use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use(morgan(morganSettings.format, morganSettings.options));
app.use(requestIp.mw());
app.configure(reqContext);

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
