import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication-client';
import constants from '../constants';

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
  .configure(authentication({ storage: window.localStorage }));

export default app;
