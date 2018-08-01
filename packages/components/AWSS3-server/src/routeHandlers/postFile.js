const logger = require('@pubsweet/logger')
const get = require('lodash/get')

module.exports = async (req, res) => {
  if (req.fileValidationError !== undefined) {
    logger.error(req.fileValidationError)
    return res.status(400).json({ error: req.fileValidationError })
  }
  logger.debug(`${req.file.originalname} has been uploaded`)

  return res.status(200).json({
    id: req.file.key,
    originalName: get(req, 'file.originalname'),
    name: get(req, 'file.metadata.FileName', get(req, 'file.originalname')),
    size: req.file.size,
  })
}
