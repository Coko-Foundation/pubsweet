const logger = require('@pubsweet/logger')
const fs = require('fs')
const crypto = require('crypto')
const mkdirp = require('mkdirp')
const unzipper = require('unzipper')

const attachment = async (epub, res, id) => {
  res.attachment(`collection-${id}.epub`)

  try {
    const archive = await epub.stream(res)

    // TODO: this might not work if the attachment header is already sent
    archive.on('error', err => {
      res.status(500).json({ error: err.message })
    })

    archive.on('end', () => {
      logger.info('Wrote %d bytes', archive.pointer())
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const folder = async (epub, res) => {
  // TODO: read the path to the uploads folder from config
  const folder = `epub/${crypto.randomBytes(32).toString('hex')}`
  const path = `${process.cwd()}/uploads/${folder}`

  if (fs.existsSync(path)) {
    throw new Error('Output path already exists')
  }

  mkdirp.sync(path)

  try {
    const archive = await epub.stream(unzipper.Extract({ path }))

    archive.on('error', err => {
      res.status(500).json({ error: err.message })
    })

    archive.on('end', () => {
      logger.info('Wrote %d bytes', archive.pointer())

      res.json({ path: folder })
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  attachment,
  folder,
}
