const path = require('path')

module.exports = {
  authsome: {
    mode: 'pubsweet-server/test/helpers/simple_authsome_mode',
  },
  validations: path.join(__dirname, 'validations'),
  'pubsweet-server': {
    baseUrl: 'http://example.com',
  },
}
