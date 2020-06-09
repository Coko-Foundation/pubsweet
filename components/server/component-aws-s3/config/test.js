const path = require('path')

module.exports = {
  'pubsweet-component-aws-s3': {
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
    bucket: process.env.AWS_S3_BUCKET,
    validations: path.resolve(__dirname, 'upload-validations.js'),
  },
}
