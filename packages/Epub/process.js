const cheerio = require('cheerio')

module.exports = ({ styles, activeConverters, book }) => fragment => {
  const $ = cheerio.load(fragment.source)
  const fragmentTitle = fragment.title
  const bookTitle = book.title
  const fragmentDivision = fragment.division
  const fragmentSubcategory = fragment.subCategory

  activeConverters.forEach(converter => converter($, fragmentTitle, bookTitle, fragmentDivision, fragmentSubcategory))

  styles.forEach(uri => {
    $('<link rel="stylesheet"/>').attr('href', uri).appendTo('head')
  })

  return {
    title: fragment.title,
    content: $.html()
  }
}
