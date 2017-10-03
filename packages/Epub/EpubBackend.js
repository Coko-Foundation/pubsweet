const HTMLEPUB = require('html-epub')
const cheerio = require('cheerio')
const sorter = require('./sorter')
const converters = require('./converters')
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

      // styles
      const styles = [
        req.params.style
      ].filter(name => name)

      // converters
      const activeConverters = [req.params.converter]
        .filter(name => name && converters[name])
        .map(name => converters[name])

      const parts = fragments.sort(sorter).map(fragment => {
        const $ = cheerio.load(fragment.source)

        activeConverters.forEach(converter => converter($))

        styles.forEach(uri => {
          $('<link rel="stylesheet"/>')
            .attr('href', uri)
            .appendTo('head')
        })

        return {
          title: fragment.title,
          content: $.html()
        }
      })

      // TODO: read the path to the uploads folder from config
      const resourceRoot = process.cwd() + '/uploads'

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
