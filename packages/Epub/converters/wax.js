module.exports = $ => {
  // remove "uploads" from the start of each src attribute
  $('[src]').each((i, elem) => {
    const $elem = $(elem)
    const src = $elem.attr('src').replace(/^\/?uploads\//)
    $elem.attr('src', src)
  })

  // replace extracts and epigraphs with "blockquote"

  $('extract-prose, extract-poetry, epigraph-poetry, epigraph-prose').each((i, elem) => {
    const $extract = $(elem)

    const blockquote = $('<blockquote class="sc-blockquote"/>')
    $extract.contents().appendTo(blockquote)

    $extract.replaceWith(blockquote)
  })

  // replace "note[content]" with "aside" and a link
  // $('note').each((i, elem) => {
  //   $(elem).remove()
  // })

  $('note').each((i, elem) => {
    const $note = $(elem)
    const aside = $(
      `<aside epub:type="endnote" id="${$note.attr('data-id')}" class="note"/>`
    )
    aside.html($note.attr('note-content'))
    $('body').append(aside)

    const callout = $(
      `<span href="${$note.attr(
        'data-id'
      )}" epub:type="noteref" class="note-callout"/>`
    )
    callout.text(i)
    $note.replaceWith(callout)
  })

  $('comment').each((i, elem) => {
    let commentEncloses = $(elem).text()
    $(elem).replaceWith(commentEncloses)
  })
  $('track-change').each((i, elem) => {
    let trackChangeStatus = $(elem).attr('status')
    if (trackChangeStatus === 'delete') {
      let trackChangeEncloses = $(elem).text()
      $(elem).replaceWith(trackChangeEncloses)
    } else {
      $(elem).remove()
    }
  })
  $('chapter-number').each((i, elem) => {
    let chapterNumberEnclosure = $(elem).text()
    $(elem).replaceWith(
      `<p class="sc-chapter-number">${chapterNumberEnclosure}</p>`
    )
  })
  $('chapter-title').each((i, elem) => {
    let chapterTitleEnclosure = $(elem).text()
    $(elem).replaceWith(
      `<p class="sc-chapter-title">${chapterTitleEnclosure}</p>`
    )
  })
  $('chapter-subtitle').each((i, elem) => {
    let chapterSubtitleEnclosure = $(elem).text()
    $(elem).replaceWith(
      `<p class="sc-chapter-subtitle">${chapterSubtitleEnclosure}</p>`
    )
  })
  $('source-note').each((i, elem) => {
    let sourceNoteEnclosure = $(elem).text()
    $(elem).replaceWith(`<p class="sc-source-note">${sourceNoteEnclosure}</p>`)
  })

  $('ol').each((i, elem) => {
    const $ol = $(elem)
    if ($ol.attr('styling') === 'qa') {
      const qa = $('<ol class="sc-list-ol-qa"/>')
      $ol.contents().appendTo(qa)

      $ol.replaceWith(qa)
    }
    if ($ol.attr('styling') === 'unstyled') {
      const unstyled = $('<ol class="sc-list-ol-unstyled"/>')
      $ol.contents().appendTo(unstyled)

      $ol.replaceWith(unstyled)
    }
  })
}
