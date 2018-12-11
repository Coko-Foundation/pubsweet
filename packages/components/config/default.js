const path = require('path')
const { deferConfig } = require('config/defer')

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
    baseUrl: deferConfig(cfg => 'http://example.com'),
  },
  mailer: {
    from: 'nobody@example.com',
    path: path.join(__dirname, 'mailer'),
  },
  'pubsweet-client': {
    'login-redirect': '/testRedirect',
  },
  journal: {
    name: 'Coko Foundation',
    staffEmail: 'Coko <team@coko.foundation>',
    logo: 'https://coko.foundation/wp-content/uploads/2017/11/logo-coko.png',
    ctaColor: '#EE2B77',
    logoLink: 'https://coko.foundation/',
    publisher: 'Coko Foundation',
    privacy: '',
    address: '2973 16th St., Suite 300, San Francisco, CA 94103',
  },
}
