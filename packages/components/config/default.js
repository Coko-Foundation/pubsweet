const path = require('path')

module.exports = {
  authsome: {
    mode: 'pubsweet-server/test/helpers/authsome_mode',
  },
  validations: path.join(__dirname, 'validations'),
  'pubsweet-component-aws-s3': {
    validations: path.join(__dirname, 'upload-validations'),
  },
}
