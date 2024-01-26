const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = process.env

module.exports = (socket, next) => {
  try {
    const { token } = socket.handshake.query
    if (!token) {
      // const err = new Error("Unauthorized");
      // err.data = { content: "Missing Auth Token" }; // additional details
      // next(err);
      socket.user = {}
      next()
    } else {
      // verifing auth token
      const decoded = jwt.verify(token, JWT_SECRET_KEY)
      socket.user = decoded
      next()
    }
  } catch (error) {
    console.log(error)
    const err = new Error(error.message)
    next(err)
  }
}
