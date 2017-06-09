import config from '../../config/client';

const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');

const socket = io('http://localhost:3000');
const app = feathers();

// Set up Socket.io client with the socket
app.configure(socketio(socket));

export default app