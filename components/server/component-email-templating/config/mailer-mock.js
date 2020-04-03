module.exports = {
  transport: {
    name: 'mailer-mock',
    version: '0.1.0',
    send: (mail, callback) => {
      const input = mail.message.createReadStream()
      input.pipe(process.stdout)
      input.on('end', () => {
        callback(null, true)
      })
    },
  },
}
