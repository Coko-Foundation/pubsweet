const cheerio = require('cheerio')

module.exports = ({
  styles,
  activeConverters,
  book,
  notesPart,
  previewer,
}) => fragment => {
  let content
  const $ = cheerio.load(fragment.source)
  const fragmentTitle = fragment.title || 'Untitled'
  const fragmentId = fragment.id
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
        fragmentId,
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
        fragmentId,
        fragmentTitle,
        bookTitle,
        fragmentDivision,
        fragmentSubcategory,
        fragmentNumber,
        notesPart,
      ),
    )
  }

  if (previewer === 'vivliostyle') {
    styles.forEach(uri => {
      $('<link rel="stylesheet"/>')
        .attr('href', uri)
        .appendTo('head')
    })
    content = $.html()
  } else {
    content = $('body').html()
  }

  return {
    title: fragment.title,
    id: fragmentId,
    content,
    division: fragmentDivision,
    type: fragmentSubcategory,
  }
}
