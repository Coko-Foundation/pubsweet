const cheerio = require('cheerio')

// TODO: read these from app config
const stylesheets = [
  '/static/epub/print.css'
]

module.exports = source => {
  const $ = cheerio.load(source)

  // remove "uploads" from the start of each img src attribute
  $('img[src]').each((i, elem) => {
    const $img = $(elem)
    const src = $img.attr('src').replace(/^\/?uploads\//)
    $img.attr('src', src)
  })

  // replace "extract-prose" with "blockquote"
  $('extract-prose').each((i, elem) => {
    const $extract = $(elem)

    const blockquote = $('<blockquote class="extract extract-prose"/>')
    $extract.contents().appendTo(blockquote)

    $extract.replaceWith(blockquote)
  })

  // replace "extract-poetry" with "blockquote"
  $('extract-poetry').each((i, elem) => {
    const $extract = $(elem)

    const blockquote = $('<blockquote class="extract extract-poetry"/>')
    $extract.contents().appendTo(blockquote)

    $extract.replaceWith(blockquote)
  })

  // replace "note[content]" with "aside" and a link
  $('note').each((i, elem) => {
    const $note = $(elem)

    const aside = $('<aside class="note"/>')
    aside.html($note.attr('content'))
    $('body').append(aside)

    const link = $('<a class="note-link"/>')
    link.text(i)
    $note.replaceWith(link)
  })

  // add links to stylesheets
  stylesheets.forEach(stylesheet => {
    const link = $('<link rel="stylesheet"/>')
    link.attr('href', stylesheet)
    $('head').append(link)
  })

  return $.html()
}
