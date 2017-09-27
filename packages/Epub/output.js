const crypto = require('crypto')
const mkdirp = require('mkdirp')
const unzipper = require('unzipper')

const attachment = async (epub, res, id) => {
  res.attachment(`collection-${id}.epub`)

  const archive = await epub.stream(res)

  // TODO: this might not work if the attachment header is already sent
  archive.on('error', err => {
    res.status(500).send({error: err.message})
  })

  archive.on('end', () => {
    console.log('Wrote %d bytes', archive.pointer())
  })
}

const folder = async (epub, res) => {
  const folder = crypto.randomBytes(64).toString('hex')

  // TODO: read the path to the uploads folder from config
  const path = process.cwd() + '/uploads/epub/' + folder

  mkdirp.sync(path)

  const archive = await epub.stream(unzipper.Extract({path}))

  archive.on('error', err => {
    res.status(500).send({error: err.message})
  })

  archive.on('end', () => {
    console.log('Wrote %d bytes', archive.pointer())

    res.json({path})
  })
}

module.exports = {
  attachment,
  folder
}
