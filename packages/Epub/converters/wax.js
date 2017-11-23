module.exports = ($, fragmentTitle, bookTitle, fragmentDivision, fragmentSubcategory, fragmentNumber) => {
  const body = $('body')

  let outerContainer = $('<div/>').attr('class', fragmentDivision)
  let innerContainer

  if (fragmentDivision === 'front') {
    innerContainer = $('<section/>').attr('data-type', 'fm-body')
  } else if (fragmentDivision === 'back') {
    innerContainer = $('<section/>').attr('data-type', 'bm-body')
  } else {
    innerContainer = $('<section/>').attr('data-type', fragmentSubcategory)
  }

  $('<p/>').attr('class', 'ch-start').html('beginning').appendTo(innerContainer)
  $('<div/>').attr('class', 'folio').appendTo(innerContainer)
  $('<div/>').attr('class', 'booktitle').html(bookTitle).appendTo(innerContainer)
  $('<div/>').attr('class', 'dup').html(fragmentTitle).appendTo(innerContainer)
  if (fragmentSubcategory === 'part') {
    $('<p/>').attr('class', 'part-number').html(fragmentNumber).appendTo(innerContainer)
  } else if (fragmentSubcategory === 'chapter') {
    $('<p/>').attr('class', 'chapter-number').html(fragmentNumber).appendTo(innerContainer)
  }
  $('<h1/>').attr('class', 'ct').html(fragmentTitle).appendTo(innerContainer)

  const replaceWithBlockquote = className => (i, elem) => {
    const $elem = $(elem)

    const blockquote = $(`<blockquote class="${className}"/>`)
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

  // add namespaces
  $('html').attr({
    'xmlns': 'http://www.w3.org/1999/xhtml',
    'xmlns:epub': 'http://www.idpf.org/2007/ops'
  })

  // replace custom HTML elements
  $('extract').each(replaceWithBlockquote('ex')) // delete when xsweet is updated
  $('extract-prose').each(replaceWithBlockquote('ex'))
  $('extract-poetry').each(replaceWithBlockquote('px'))
  $('epigraph-poetry').each(replaceWithBlockquote('sepo'))
  $('epigraph-prose').each(replaceWithBlockquote('sep'))
  $('bibliography-entry').each(replaceWithParagraph('bibliography-entry'))
  $('comment').each(replaceWithText)
  // $('chapter-number').each(replaceWithParagraph('sc-chapter-number'))
  $('chapter-title').each(replaceWithParagraph('ct'))
  $('chapter-subtitle').each(replaceWithParagraph('cst'))
  $('source-note').each(replaceWithParagraph('exsn'))
  $('ol[styling="qa"]').each(replaceWithList('di'))
  $('ol[styling="unstyled"]').each(replaceWithList('none'))

  // remove "uploads" from the start of each src attribute
  $('[src]').each((i, elem) => {
    const $elem = $(elem)

    const src = $elem.attr('src').replace(/^\/?uploads\//, '')

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
    const content = `${i + 1}. ${$elem.attr('note-content')}`

    const callout = $(`
      <a class="inline-note-callout" href="#${id}">
        <sup>${i + 1}</sup>
      </a>
      <span class="inline-note-footer" data-note-num="${id}">
        ${content}
      </span>
    `)

    $elem.replaceWith(callout)
  })

  let bodyContent = body.contents()
  innerContainer.append(bodyContent)
  outerContainer.append(innerContainer)
  body.replaceWith(outerContainer)
}
