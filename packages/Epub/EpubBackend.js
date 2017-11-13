const HTMLEPUB = require('html-epub')
const sorter = require('./sorter')
const converters = require('./converters')
const processFragment = require('./process')
const output = require('./output')
const fs = require('fs')

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

      // CSS Theme
      // TODO: change it from array to the name of the selected theme
      let styles = [req.query.style].filter(name => name)
      // TODO: to be desided where the per applications themes should live
      let stylesRoot = process.cwd() + '/static'
      console.log('where', __dirname)
      if (styles.length === 0 || !fs.existsSync(`${stylesRoot}/${styles[0]}`)) {
        styles = ['defaultEpubTheme.css']
        stylesRoot = `${__dirname}/themes`
      }
      console.log('styles', styles)
      console.log('stylesroot', stylesRoot)
      // converters
      const activeConverters = [req.query.converter]
        .filter(name => name && converters[name])
        .map(name => converters[name])

      const parts = fragments.sort(sorter).map(
        processFragment({ styles, activeConverters })
      )

      // TODO: read the path to the uploads folder from config
      const resourceRoot = process.cwd() + '/uploads'

      const epub = new HTMLEPUB(book, {resourceRoot, stylesRoot})

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
