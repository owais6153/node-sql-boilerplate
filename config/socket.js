require('dotenv').config()
const socketAuth = require('../middleware/socketAuth')
const {
  sendRealtimeDataToAll,
  sendRealtimeDataToSpecificUser,
  onConnect,
} = require('../util/socket')

const socketInit = function (server) {
  console.log('Sockets: Initializing')
  const io = require('socket.io')(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ['GET', 'POST'],
    },
  })
  io.use(socketAuth)
  console.log('Sockets: Initialized', 'Waiting for the events')
  io.on('connection', onConnect)
  return io
}

module.exports = {
  socketInit,
}
