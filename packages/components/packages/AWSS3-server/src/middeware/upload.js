const Joi = require('joi')
const uuid = require('uuid')
const config = require('config')
const multer = require('multer')
const { get } = require('lodash')
const multerS3 = require('multer-s3')

const s3Config = get(config, 'pubsweet-component-aws-s3')
const uploadValidations = require(s3Config.validations)

const setupMulter = s3 => {
  const upload = multer({
    storage: multerS3({
      s3,
      bucket: s3Config.bucket,
      contentType: (req, file, cb) => {
        cb(null, file.mimetype)
      },
      metadata: (req, file, cb) => {
        cb(null, {
          FileType: get(req, 'body.fileType'),
          FileName: get(file, 'originalname'),
        })
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
