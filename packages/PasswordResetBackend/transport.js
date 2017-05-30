const config = require('config')
const nodemailer = require('nodemailer')

// SMTP transport options: https://nodemailer.com/smtp/

const options = config.get('mail-transport')

if (!options) {
  throw new Error("config 'mail-transport' not set")
}

module.exports = nodemailer.createTransport(options)
