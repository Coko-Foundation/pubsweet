module.exports = $ => {
  // remove "uploads" from the start of each src attribute
  $('[src]').each((i, elem) => {
    const $elem = $(elem)
    const src = $elem.attr('src').replace(/^\/?uploads\//)
    $elem.attr('src', src)
  })

  // replace "extract-prose" with "blockquote"
  $('extract-prose').each((i, elem) => {
    const $extract = $(elem)

    const blockquote = $('<blockquote class="extract extract-prose"/>')
    $extract.contents().appendTo(blockquote)

    $extract.replaceWith(blockquote)
  })

  // replace "extract-poetry" with "blockquote"
  $('extract-poetry').each((i, elem) => {
    const $extract = $(elem)

    const blockquote = $('<blockquote class="extract extract-poetry"/>')
    $extract.contents().appendTo(blockquote)

    $extract.replaceWith(blockquote)
  })

  // replace "note[content]" with "aside" and a link
  $('note').each((i, elem) => {
    const $note = $(elem)

    const aside = $('<aside class="note"/>')
    aside.html($note.attr('content'))
    $('body').append(aside)

    const link = $('<a class="note-link"/>')
    link.text(i)
    $note.replaceWith(link)
  })
}
