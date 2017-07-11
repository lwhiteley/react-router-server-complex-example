import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication-client';
import constants from '../constants';
import clientUtils from './client-utils';
import storage from './simple-storage';

const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');

const app = feathers()
  .configure(
    socketio(io(constants.baseUrl), {
      timeout: 2000,
    })
  )
  .configure(hooks())
  .configure(authentication({ storage }));

app.on('logout', clientUtils.logoutHandler(app));

export default app;
