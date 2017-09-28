const cheerio = require('cheerio')

module.exports = source => {
  const $ = cheerio.load(source)

  // remove "uploads" from the start of each img src attribute
  $('img[src]').each((i, elem) => {
    elem.attr('src', elem.attr('src').replace(/^\/?uploads\//))
  })

  return $.html()
}
