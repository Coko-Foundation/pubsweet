const AWS = require('aws-sdk')

module.exports = {
  mailer: {
    from: process.env.EMAIL_SENDER,
    transport: {
      SES: new AWS.SES({
        accessKeyId: process.env.AWS_SES_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SES_SECRET_KEY,
        region: process.env.AWS_SES_REGION,
      }),
    },
  },
}
