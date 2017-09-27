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
  // TODO: read the path to the uploads folder from config
  const folder = 'epub/' + crypto.randomBytes(32).toString('hex')
  const path = process.cwd() + '/uploads/' + folder

  mkdirp.sync(path)

  const archive = await epub.stream(unzipper.Extract({path}))

  archive.on('error', err => {
    res.status(500).send({error: err.message})
  })

  archive.on('end', () => {
    console.log('Wrote %d bytes', archive.pointer())

    res.json({path: folder})
  })
}

module.exports = {
  attachment,
  folder
}
