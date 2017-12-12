const config = require('config')
const nodemailer = require('nodemailer')

// SMTP transport options: https://nodemailer.com/smtp/

const options = config.get('mail-transport')

module.exports = nodemailer.createTransport(options)