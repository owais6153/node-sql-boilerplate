require('dotenv').config()
const twilio = require('../config/twilio')
module.exports = {
  sendSMS: async (toPhoneNumber, message, shouldThrowError = false) => {
    try {
      console.log({
        body: message,
        from: process.env.TWILIO_FROM_PHONE,
        to: `+${toPhoneNumber}`,
      })

      await twilio.messages
        .create({
          body: message,
          from: process.env.TWILIO_FROM_PHONE,
          to: `+${toPhoneNumber}`,
        })
        .then(message => console.log('Message Sent: ', message))
        .catch(err => {
          if (shouldThrowError) throw new Error(err)
          console.log('Error sending message from Twilio: ', err)
        })
    } catch (error) {
      if (shouldThrowError) throw new Error(error)
      console.log('Error sending message from twilio: ', error)
    }
  },
}
