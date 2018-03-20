const nodemailer = require('nodemailer')
const config = require('config')

const mailerConfig = require(config.mailer.path)
module.exports = {
  send: mailData => {
    const transporter = nodemailer.createTransport(mailerConfig.transport)
    return transporter.sendMail(mailData)
  },
}
