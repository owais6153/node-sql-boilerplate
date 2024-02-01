require('dotenv').config()
const sendGridMail = require('@sendgrid/mail')

const { SENDGRID_MAIL_FROM, SENDGRID_API_KEY, SENDGRID_WELCOME_TEMPLATE_ID } = process.env
sendGridMail.setApiKey(SENDGRID_API_KEY)

module.exports = {
  mailFrom: SENDGRID_MAIL_FROM,
  templateIDs: {
    welcome: SENDGRID_WELCOME_TEMPLATE_ID,
  },
  sendGridMail,
}
