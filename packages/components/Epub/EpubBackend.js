const HTMLEPUB = require('html-epub')
const fs = require('fs')
const cheerio = require('cheerio')

const sorter = require('./sorter')
const converters = require('./converters')
const processFragment = require('./process')
const output = require('./output')
const config = require('config')
const pagednation = require('./pagednation')

const EpubBackend = app => {
  // TODO: change url to something more relevant
  app.use('/api/collections/:id/epub', async (req, res, next) => {
    try {
      const { Collection } = app.locals.models

      const { id } = req.params
      const previewer = req.query.previewer || 'vivliostyle'
      const converter =
        config['pubsweet-client'] && config['pubsweet-client'].converter
          ? config['pubsweet-client'].converter
          : 'default'

      // book
      const collection = await Collection.find(id)

      const book = {
        title: collection.title,
        identifier: collection.id,
      }

      // chapters
      const fragments = await collection.getFragments()
      let notesPart
      if (converter === 'ucp') {
        notesPart = cheerio.load(
          '<html><body><section id="comp-notes-0" data-type="notes"><header><h1 class="ct">Notes</h1></header></section></body></html>',
        )
      }

      // CSS Theme
      // TODO: change it from array to the name of the selected theme
      let styles = [req.query.style].filter(name => name)
      // TODO: to be desided where the per applications themes should live
      let stylesRoot = `${process.cwd()}/static`

      if (styles.length === 0 || !fs.existsSync(`${stylesRoot}/${styles[0]}`)) {
        if (previewer === 'vivliostyle') {
          styles = ['default.css']
        } else {
          styles = ['paged_default.css']
        }
        stylesRoot = `${__dirname}/themes`
      }

      let fontsRoot =
        config.epub && config.epub.fontsPath
          ? process.cwd() + config.epub.fontsPath
          : null

      if (!fs.existsSync(fontsRoot)) fontsRoot = ''

      // converters
      const activeConverters = [`wax-${previewer}-${converter}`]
        .filter(name => name && converters[name])
        .map(name => converters[name])

      const parts = fragments.sort(sorter).map(
        processFragment({
          styles,
          activeConverters,
          book,
          notesPart,
          previewer,
        }),
      )

      if (converter === 'ucp') {
        const notesFragment = {
          source: notesPart.html(),
          division: 'back',
          subCategory: 'component',
          title: 'Notes',
          id: 'notes-0',
        }

        const notes = processFragment({
          styles,
          activeConverters,
          book,
          notesPart,
          previewer,
        })(notesFragment)

        const notesHTML = cheerio.load(notesPart.html())
        const hasNotes = notesHTML('ol').length > 0
        if (hasNotes) {
          parts.push(notes)
        }
      }

      // TODO: read the path to the uploads folder from config
      const resourceRoot = `${process.cwd()}/uploads`

      let outcome
      switch (previewer) {
        default: {
          outcome = new HTMLEPUB(book, { resourceRoot, stylesRoot, fontsRoot })
          await outcome.load(parts)
          break
        }
        case 'paged': {
          outcome = await pagednation.create(
            book,
            parts,
            resourceRoot,
            stylesRoot,
            fontsRoot,
          )
          break
        }
      }

      switch (req.query.destination) {
        case 'folder':
          output.folder(outcome, stylesRoot, previewer, res)
          break
        case 'attachment':
        default:
          output.attachment(outcome, res, id)
          break
      }
    } catch (e) {
      next(e)
    }
  })
  app.use('/api/pagedStyler/stylesheet/:id/', async (req, res, next) => {
    const { id } = req.params
    const { body } = req
    const { source } = body
    const path = `${process.cwd()}/uploads/paged/${id}/default.css`

    try {
      await writeFile(path, source)
      res.status(201).json({ msg: 'done' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
  app.use('/api/pagedStyler/exportHTML/:id/', async (req, res, next) => {
    const { id } = req.params
    const path = `${process.cwd()}/uploads/paged/${id}/index.html`

    try {
      const file = await readFile(path)
      res.setHeader('Content-Type', 'text/html')
      res.setHeader('Content-Disposition', `attachment; filename=${id}.html`)
      res.write(file, 'binary')
      res.end()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
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
    fs.readFile(location, 'binary', (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })

module.exports = EpubBackend
