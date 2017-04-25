const path = require('path')
const HTMLEPUB = require('html-epub')
const Collection = require('pubsweet-server/src/models/Collection')
const serverPath = require('pubsweet/src/backend')()

const EpubBackend = function (app) {
  app.use('/api/collections/:id/epub', async function (req, res, next) {
    try {
      const id = req.params.id

      res.attachment(`collection-${id}.epub`)

      // book
      const collection = await Collection.find(id)

      const book = {
        title: collection.title,
        identifier: collection.id
      }

      // chapters
      const fragments = await collection.getFragments()

      const parts = fragments.map(fragment => ({
        title: fragment.title,
        content: fragment.source
      }))

      // NOTE: "uploads" is hard-coded in the image path
      const resourceRoot = path.join(serverPath, '..', '..', '')

      const epub = new HTMLEPUB(book, {resourceRoot})

      await epub.load(parts)

      const archive = await epub.stream(res)

      // TODO: this might not work if the attachment header is already sent
      archive.on('error', err => {
        res.status(500).send({error: err.message})
      })

      archive.on('end', () => {
        console.log('Wrote %d bytes', archive.pointer())
      })
    } catch (e) {
      next(e)
    }
  })
}

module.exports = EpubBackend
