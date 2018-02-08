const multer = require('multer')
const multerS3 = require('multer-s3')
const uuid = require('uuid')
const Joi = require('joi')
const _ = require('lodash')
const config = require('config')

const s3Config = _.get(config, 'pubsweet-component-aws-s3')
const uploadValidations = require(s3Config.validations)

const setupMulter = s3 => {
  const upload = multer({
    storage: multerS3({
      s3,
      bucket: s3Config.bucket,
      contentType: (req, file, cb) => {
        cb(null, file.mimetype)
      },
      key: (req, file, cb) => {
        const fileKey = `${req.body.fragmentId}/${uuid.v4()}`
        cb(null, fileKey)
      },
    }),
    fileFilter: (req, file, cb) => validateFile(req, file, cb),
  })

  return upload
}

const validateFile = (req, file, cb) => {
  const { fileType } = req.body
  const { mimetype } = file

  const valid = Joi.validate({ [fileType]: mimetype }, uploadValidations)

  if (valid.error) {
    req.fileValidationError = valid.error.message
    return cb(null, false)
  }

  return cb(null, true)
}

module.exports = {
  setupMulter,
  validateFile,
}
