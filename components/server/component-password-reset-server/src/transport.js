const config = require('config')
const nodemailer = require('nodemailer')

// SMTP transport options: https://nodemailer.com/smtp/
const options = require(config.get('mailer.path'))
module.exports = nodemailer.createTransport(options.transport)
