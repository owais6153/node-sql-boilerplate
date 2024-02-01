const { sendGridMail, mailFrom } = require('../config/sendgrid')

module.exports = async (templateId, recipient, subject, dynamicParams, throwError = false) => {
  try {
    const message = {
      to: recipient,
      from: mailFrom, // Use the email address or domain you verified above
      subject,
      templateId,
      dynamicTemplateData: dynamicParams,
    }
    const sendedResponse = await sendGridMail.send(message)
    console.log('sendedResponse ===> ', sendedResponse)
  } catch (error) {
    console.log('Error sending mail: ', error)
    if (error.response) console.error(error.response.body)
    else console.log('Error sending mail: ', error)

    if (throwError) throw Error(error.message || error.response.body)
  }
}
