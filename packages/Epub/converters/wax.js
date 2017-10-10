module.exports = $ => {
  // remove "uploads" from the start of each src attribute
  $('[src]').each((i, elem) => {
    const $elem = $(elem)
    const src = $elem.attr('src').replace(/^\/?uploads\//)
    $elem.attr('src', src)
  })

  // replace extracts and epigraphs with "blockquote"

  $('extract-prose, extract-poetry, epigraph-poetry, epigraph-prose').each((i, elem) => {
    const $elem = $(elem)

    const blockquote = $('<blockquote class="sc-blockquote"/>')

    $elem.contents().appendTo(blockquote)

    $elem.replaceWith(blockquote)
  })

  // replace "note[content]" with "aside" and a link
  // $('note').each((i, elem) => {
  //   $(elem).remove()
  // })

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

  $('comment').each((i, elem) => {
    const $elem = $(elem)

    $elem.replaceWith($elem.text())
  })

  $('track-change').each((i, elem) => {
    const $elem = $(elem)

    if ($elem.attr('status') === 'delete') {
      $elem.replaceWith($elem.text())
    } else {
      $elem.remove()
    }
  })

  $('chapter-number').each((i, elem) => {
    const $elem = $(elem)

    const p = $('<p class="sc-chapter-number"/>')
      .text($elem.text())

    $elem.replaceWith(p)
  })

  $('chapter-title').each((i, elem) => {
    const $elem = $(elem)

    const p = $('<p class="sc-chapter-title"/>')
      .text($elem.text())

    $elem.replaceWith(p)
  })

  $('chapter-subtitle').each((i, elem) => {
    const $elem = $(elem)

    const p = $('<p class="sc-chapter-subtitle"/>')
      .text($elem.text())

    $elem.replaceWith(p)
  })

  $('source-note').each((i, elem) => {
    const $elem = $(elem)

    const p = $('<p class="sc-source-note"/>')
      .text($elem.text())

    $elem.replaceWith(p)
  })

  // add class name to ordered lists
  $('ol').each((i, elem) => {
    const $elem = $(elem)

    switch ($elem.attr('styling')) {
      case 'qa':
        const qa = $('<ol class="sc-list-ol-qa"/>')
        $elem.contents().appendTo(qa)
        $elem.replaceWith(qa)
        break

      case 'unstyled':
        const unstyled = $('<ol class="sc-list-ol-unstyled"/>')
        $elem.contents().appendTo(unstyled)
        $elem.replaceWith(unstyled)
        break
    }
  })
}
