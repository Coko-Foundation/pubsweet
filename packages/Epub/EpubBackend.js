const HTMLEPUB = require('html-epub')
const sorter = require('./sorter')
const convert = require('./convert')
const output = require('./output')

const EpubBackend = function (app) {
  app.use('/api/collections/:id/epub', async function (req, res, next) {
    try {
      const Collection = app.locals.models.Collection

      const id = req.params.id

      // book
      const collection = await Collection.find(id)

      const book = {
        title: collection.title,
        identifier: collection.id
      }

      // chapters
      const fragments = await collection.getFragments()

      const parts = fragments.sort(sorter).map(fragment => ({
        title: fragment.title,
        content: convert(fragment.source)
      }))

      // TODO: read the path to the uploads folder from config
      // TODO: remove hard-coded "uploads" from the image path
      const resourceRoot = process.cwd() + '/uploads'
      // const resourceRoot = process.cwd()

      const epub = new HTMLEPUB(book, {resourceRoot})

      await epub.load(parts)

      switch (req.query.destination) {
        case 'folder':
          return output.folder(epub, res)

        case 'attachment':
        default:
          return output.attachment(epub, res, id)
      }
    } catch (e) {
      next(e)
    }
  })
}

module.exports = EpubBackend
