const { get } = require('lodash')
const { promisify } = require('util')
const nodeArchiver = require('archiver')
const logger = require('@pubsweet/logger')

const zipFiles = (s3, s3Config, archiver = nodeArchiver) => {
  const asyncGetObject = promisify(s3.getObject.bind(s3))
  const asyncListObjects = promisify(s3.listObjects.bind(s3))
  return async (req, res) => {
    const { fragmentId } = req.params
    try {
      const params = {
        Bucket: s3Config.bucket,
        Prefix: `${fragmentId}`,
      }
      const s3Items = await asyncListObjects(params)

      if (s3Items) {
        const s3Files = await Promise.all(
          s3Items.Contents.map(content =>
            asyncGetObject({
              Bucket: s3Config.bucket,
              Key: content.Key,
            }),
          ),
        )

        if (s3Files) {
          const archive = archiver('zip')
          archive.pipe(res)
          res.attachment(`${fragmentId}-archive.zip`)

          s3Files.forEach(f => {
            archive.append(f.Body, {
              name: `${get(f, 'Metadata.filetype') || 'supplementary'}/${get(
                f,
                'Metadata.filename',
              ) || f.ETag}`,
            })
          })
          archive.finalize()
        }
      } else {
        res.status(204).json({
          message: `No files found for the requested manuscript.`,
        })
      }
    } catch (err) {
      logger.error(err.message)
      res.status(err.statusCode).json({ error: err.message })
    }
  }
}

module.exports = zipFiles
