const cheerio = require('cheerio')

module.exports = ({ styles, activeConverters, book }) => fragment => {
  const $ = cheerio.load(fragment.source)
  const fragmentTitle = fragment.title || 'Untitled'
  const bookTitle = book.title
  const fragmentDivision = fragment.division
  const fragmentSubcategory = fragment.subCategory
  const fragmentNumber = fragment.hasOwnProperty('number')
    ? fragment.number
    : -1

  activeConverters.forEach(converter => converter($, fragmentTitle, bookTitle, fragmentDivision, fragmentSubcategory, fragmentNumber))

  styles.forEach(uri => {
    $('<link rel="stylesheet"/>').attr('href', uri).appendTo('head')
  })

  return {
    title: fragment.title,
    content: $.html()
  }
}
