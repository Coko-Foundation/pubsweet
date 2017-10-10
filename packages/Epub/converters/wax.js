module.exports = $ => {
  const replaceWithBlockquote = (i, elem) => {
    const $elem = $(elem)

    const blockquote = $('<blockquote class="sc-blockquote"/>')
      .append($elem.contents())

    $elem.replaceWith(blockquote)
  }

  const replaceWithText = (i, elem) => {
    const $elem = $(elem)

    $elem.replaceWith($elem.text())
  }

  const replaceWithParagraph = className => (i, elem) => {
    const $elem = $(elem)

    const p = $('<p/>')
      .attr('class', className)
      .text($elem.text())

    $elem.replaceWith(p)
  }

  const replaceWithList = className => (i, elem) => {
    const $elem = $(elem)

    const list = $('<ol/>')
      .attr('class', className)
      .append($elem.contents())

    $elem.replaceWith(list)
  }

  // replace custom HTML elements
  $('extract-prose, extract-poetry, epigraph-poetry, epigraph-prose')
    .each(replaceWithBlockquote)
  $('comment').each(replaceWithText)
  $('chapter-number').each(replaceWithParagraph('sc-chapter-number'))
  $('chapter-title').each(replaceWithParagraph('sc-chapter-title'))
  $('chapter-subtitle').each(replaceWithParagraph('sc-chapter-subtitle'))
  $('source-note').each(replaceWithParagraph('source-note'))
  $('ol[styling="qa"]').each(replaceWithList('sc-list-ol-qa'))
  $('ol[styling="unstyled"]').each(replaceWithList('sc-list-ol-unstyled'))

  // remove "uploads" from the start of each src attribute
  $('[src]').each((i, elem) => {
    const $elem = $(elem)
    const src = $elem.attr('src').replace(/^\/?uploads\//)
    $elem.attr('src', src)
  })

  // accept or remove "track-change" elements
  $('track-change').each((i, elem) => {
    const $elem = $(elem)

    if ($elem.attr('status') === 'delete') {
      $elem.replaceWith($elem.text())
    } else {
      $elem.remove()
    }
  })

  // replace inline notes with endnotes
  $('note').each((i, elem) => {
    const $elem = $(elem)

    const id = $elem.attr('data-id')

    $('<aside epub:type="endnote" class="note"/>')
      .attr('id', id)
      .html($elem.attr('note-content'))
      .appendTo('body')

    const callout = $('<span epub:type="noteref" class="note-callout"/>')
      .attr('href', id) // TODO: needs hash?
      .text(i)

    $elem.replaceWith(callout)
  })
}
