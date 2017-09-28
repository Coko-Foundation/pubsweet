const cheerio = require('cheerio')

module.exports = source => {
  const $ = cheerio.load(source)

  // remove "uploads" from the start of each img src attribute
  $('img[src]').each(() => {
    const $img = $(this)
    $img.attr('src', $img.attr('src').replace(/^\/?uploads\//))
  })

  // replace "note" elements with divs
  $('note').each(() => {
    const $note = $(this)
    const div = $('<div class="note"/>')
    $note.contents().appendTo(div)
    $note.replaceWith(div)
  })

  return $.html()
}
