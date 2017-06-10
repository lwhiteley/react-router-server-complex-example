// import config from '../../config/client';

const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');
// const rest = require('feathers-rest/client');
// const axios = require('axios');

const socket = io('http://localhost:3000');
const app = feathers();
// const restClient = rest(config.apiBasePath);

// Set up Socket.io client with the socket
app.configure(socketio(socket, {
  timeout: 2000,
}));

// app.configure(restClient.axios(axios));

export default app;
