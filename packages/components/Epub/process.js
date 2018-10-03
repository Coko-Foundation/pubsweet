const cheerio = require('cheerio')

module.exports = ({
  styles,
  activeConverters,
  book,
  notesPart,
}) => fragment => {
  const $ = cheerio.load(fragment.source)
  const fragmentTitle = fragment.title || 'Untitled'
  const bookTitle = book.title
  const fragmentDivision = fragment.division
  const fragmentSubcategory = fragment.subCategory
  const fragmentNumber = Object.prototype.hasOwnProperty.call(
    fragment,
    'number',
  )
    ? fragment.number
    : -1

  if (notesPart === undefined) {
    activeConverters.forEach(converter =>
      converter(
        $,
        fragmentTitle,
        bookTitle,
        fragmentDivision,
        fragmentSubcategory,
        fragmentNumber,
      ),
    )
  } else {
    activeConverters.forEach(converter =>
      converter(
        $,
        fragmentTitle,
        bookTitle,
        fragmentDivision,
        fragmentSubcategory,
        fragmentNumber,
        notesPart,
      ),
    )
  }
  styles.forEach(uri => {
    $('<link rel="stylesheet"/>')
      .attr('href', uri)
      .appendTo('head')
  })

  return {
    title: fragment.title,
    content: $.html(),
    division: fragmentDivision,
    type: fragmentSubcategory,
  }
}
