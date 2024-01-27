const ioc = require('socket.io-client')
const express = require('express')
const { socketInit } = require('../../config/socket')

let clientSocket, io

beforeAll(done => {
  jest.setTimeout(60000)
  const app = express()

  const server = app.listen(3000, () => {
    console.log('This is listening to the port')
  })

  io = socketInit(server)

  clientSocket = ioc('http://localhost:3000')
  clientSocket.on('connect', () => {
    console.log('Client Connected')

    done()
  })
})

describe('Test Socket Connection', () => {
  it('should connect socket server and emit message', done => {
    clientSocket.on('test-connection', data => {
      console.log('msg data', data)
      expect(data.message).toBe('test-connection')
      done()
    })
    io.emit('test-connection', { message: 'test-connection' })
  })
})

afterAll(() => {
  io?.close()
  clientSocket.close()
})
