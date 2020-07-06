const path = require('path')

module.exports = {
  'pubsweet-component-aws-s3': {
    secretAccessKey: 'AWS_S3_SECRET_KEY',
    accessKeyId: 'AWS_S3_ACCESS_KEY',
    region: 'AWS_S3_REGION',
    bucket: 'AWS_S3_BUCKET',
    validations: path.resolve(__dirname, 'upload-validations.js'),
  },
}
