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

const writeFile = (location, content) =>
  new Promise((resolve, reject) => {
    fs.writeFile(location, content, 'utf8', err => {
      if (err) return reject(err)
      return resolve()
    })
  })
const readFile = location =>
  new Promise((resolve, reject) => {
    fs.readFile(location, 'utf8', (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })

const folder = async (outcome, stylesRoot = undefined, previewer, res) => {
  // TODO: read the path to the uploads folder from config
  const folder = `${previewer}/${crypto.randomBytes(32).toString('hex')}`
  const path = `${process.cwd()}/uploads/${folder}`

  if (fs.existsSync(path)) {
    throw new Error('Output path already exists')
  }

  mkdirp.sync(path)

  if (previewer === 'vivliostyle') {
    try {
      const archive = await outcome.stream(unzipper.Extract({ path }))

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
  } else {
    try {
      const where = `${path}/index.html`
      const styles = `${path}/default.css`
      const content = outcome.html()
      const stylesContent = await readFile(`${stylesRoot}/paged_default.css`)

      await writeFile(where, content)
      await writeFile(styles, stylesContent)
      res.json({ path: folder })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = {
  attachment,
  folder,
}
