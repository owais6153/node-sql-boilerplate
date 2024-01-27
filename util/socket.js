const { io } = require('../config/socket')

const connectedUserSocketIDs = {}

const onConnect = async socket => {
  const { id: userId } = socket.user
  console.log('new connection on socket => ', socket.id)
  if (userId) {
    console.log('with userId => ', socket.user.id)

    connectedUserSocketIDs[userId] = socket.id

    console.log('broadcasting to all users that a new user is online', socket.user.id)
    io.emit('is-online', { recipientId: userId, isOnline: true })
  }

  // for checking online and offline status of user
  socket.on('is-online', async (data, ackCallback) => {
    console.log('Successfull Broadcast', data)
  })

  // disconnect event
  socket.on('disconnect', async () => {
    try {
      const { id: userId } = socket.user
      console.log('socket disconnected => ', socket.id)
      if (userId) {
        console.log('with userId => ', socket.user.id)
        delete connectedUserSocketIDs[userId]
        io.emit('is-online', { recipientId: userId, isOnline: false, lastSeen: new Date() })
      }
    } catch (error) {
      console.error('Socket Error:', error)
    }
  })
}

const sendRealtimeDataToSpecificUser = (eventName, userId, data) => {
  const userSocketID = connectedUserSocketIDs[userId]
  if (userSocketID) {
    console.log(
      `emit: sending data to userId: ${userId} on event: ${eventName} with data: ${JSON.stringify(
        data
      )}`
    )
    io.to(userSocketID).emit(eventName, data)
  }
}
const sendRealtimeDataToAll = (eventName, userId, data) => {
  console.log(
    `emit: sending data to userId: ${userId} on event: ${eventName} with data: ${JSON.stringify(
      data
    )}`
  )
  io.emit(eventName, data)
}

module.exports = {
  sendRealtimeDataToAll,
  sendRealtimeDataToSpecificUser,
  onConnect,
}
