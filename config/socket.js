require('dotenv').config()
const socketAuth = require('../middleware/socketAuth')

var io
const socketInit = function (server) {
  console.log('Sockets: Initializing')
  io = require('socket.io')(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ['GET', 'POST'],
    },
  })
  io.use(socketAuth)
  console.log('Sockets: Initialized', 'Waiting for the events')
}

module.exports = {
  io,
  socketInit,
}
