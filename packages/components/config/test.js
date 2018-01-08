const path = require('path')

module.exports = {
  authsome: {
    mode: 'pubsweet-server/test/helpers/authsome_mode',
  },
  validations: path.join(__dirname, 'validations'),
}
