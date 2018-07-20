const path = require('path')

module.exports = {
  authsome: {
    mode: 'pubsweet-server/test/helpers/authsome_mode',
  },
  validations: path.join(__dirname, 'validations'),
  'pubsweet-component-aws-ses': {
    secretAccessKey: process.env.AWS_SES_SECRET_KEY,
    accessKeyId: process.env.AWS_SES_ACCESS_KEY,
    region: process.env.AWS_SES_REGION,
    sender: process.env.EMAIL_SENDER || 'test_sender@domain.com',
  },
  'pubsweet-component-aws-s3': {
    validations: path.join(__dirname, 'upload-validations'),
  },
  'pubsweet-server': {
    baseUrl: 'http://example.com',
    secret: 'not so secret',
  },
  mailer: {
    from: 'nobody@example.com',
  },
  'auth-orcid': {
    clientID: '123',
    clientSecret: 'abc',
    authorizationURL: 'http://localhost:8080/oauth/authorize',
    tokenURL: 'http://localhost:8080/oauth/token',
  },
}
