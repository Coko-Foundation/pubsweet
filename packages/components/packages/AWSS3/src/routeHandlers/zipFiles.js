const { get } = require('lodash')
const archiver = require('archiver')
const { promisify } = require('util')
const logger = require('@pubsweet/logger')

const zipFiles = (s3, s3Config) => {
  const asyncGetObject = promisify(s3.getObject.bind(s3))
  const asyncListObjects = promisify(s3.listObjects.bind(s3))
  return async (req, res) => {
    const { fragmentId } = req.params

    try {
      const archive = archiver('zip')
      archive.pipe(res)
      res.attachment(`${fragmentId}-archive.zip`)

      const params = {
        Bucket: s3Config.bucket,
        Prefix: `${fragmentId}`,
      }

      const s3Items = await asyncListObjects(params)
      const s3Files = await Promise.all(
        s3Items.Contents.map(content =>
          asyncGetObject({
            Bucket: s3Config.bucket,
            Key: content.Key,
          }),
        ),
      )

      s3Files.forEach(f => {
        archive.append(f.Body, {
          name: `${get(f, 'Metadata.filetype') || 'supplementary'}/${get(
            f,
            'Metadata.filename',
          ) || f.ETag}`,
        })
      })

      archive.finalize()
    } catch (err) {
      logger.error(err.message)
      res.status(err.statusCode).json({ error: err.message })
    }
  }
}

module.exports = zipFiles
