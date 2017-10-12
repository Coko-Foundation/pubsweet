const cheerio = require('cheerio')

module.exports = ({ styles, activeConverters }) => fragment => {
  const $ = cheerio.load(fragment.source)

  activeConverters.forEach(converter => converter($))

  styles.forEach(uri => {
    $('<link rel="stylesheet"/>').attr('href', uri).appendTo('head')
  })

  return {
    title: fragment.title,
    content: $.html()
  }
}
