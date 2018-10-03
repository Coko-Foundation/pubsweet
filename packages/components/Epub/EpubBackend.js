const HTMLEPUB = require('html-epub')
const fs = require('fs')
const cheerio = require('cheerio')

const sorter = require('./sorter')
const converters = require('./converters')
const processFragment = require('./process')
const output = require('./output')
const config = require('config')

const EpubBackend = app => {
  app.use('/api/collections/:id/epub', async (req, res, next) => {
    try {
      const { Collection } = app.locals.models

      const { id } = req.params

      // book
      const collection = await Collection.find(id)

      const book = {
        title: collection.title,
        identifier: collection.id,
      }

      // chapters
      const fragments = await collection.getFragments()
      let notesPart
      if (
        config['pubsweet-client'] &&
        config['pubsweet-client'].converter === 'wax-ucp'
      ) {
        notesPart = cheerio.load(
          '<html><body><section data-type="notes"><h1 class="ct">Notes</h1></section></body></html>',
        )
      }

      // CSS Theme
      // TODO: change it from array to the name of the selected theme
      let styles = [req.query.style].filter(name => name)
      // TODO: to be desided where the per applications themes should live
      let stylesRoot = `${process.cwd()}/static`

      if (styles.length === 0 || !fs.existsSync(`${stylesRoot}/${styles[0]}`)) {
        styles = ['default.css']
        stylesRoot = `${__dirname}/themes`
      }

      let fontsRoot =
        config.epub && config.epub.fontsPath
          ? process.cwd() + config.epub.fontsPath
          : null

      if (!fs.existsSync(fontsRoot)) fontsRoot = ''

      // converters
      const activeConverters = [req.query.converter]
        .filter(name => name && converters[name])
        .map(name => converters[name])

      const parts = fragments
        .sort(sorter)
        .map(processFragment({ styles, activeConverters, book, notesPart }))

      if (
        config['pubsweet-client'] &&
        config['pubsweet-client'].converter === 'wax-ucp'
      ) {
        const notesFragment = {
          source: notesPart.html(),
          division: 'back',
          subCategory: 'component',
          title: 'Notes',
        }
        const notes = processFragment({
          styles,
          activeConverters,
          book,
          notesPart,
        })(notesFragment)

        parts.push(notes)
      }

      // TODO: read the path to the uploads folder from config
      const resourceRoot = `${process.cwd()}/uploads`

      const epub = new HTMLEPUB(book, { resourceRoot, stylesRoot, fontsRoot })

      await epub.load(parts)

      switch (req.query.destination) {
        case 'folder':
          output.folder(epub, res)
          break
        case 'attachment':
        default:
          output.attachment(epub, res, id)
      }
    } catch (e) {
      next(e)
    }
  })
}

module.exports = EpubBackend
