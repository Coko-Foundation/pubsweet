const hljs = require('highlight.js')

module.exports = (
  $,
  fragmentId,
  fragmentTitle,
  bookTitle,
  fragmentDivision,
  fragmentSubcategory,
  fragmentNumber,
  notesPart,
) => {
  const body = $('body')
  const container = $('<section/>')
  let hasTitles = false
  let header
  if ($('chapter-title').length > 0 || $('chapter-subtitle').length > 0) {
    hasTitles = true
  }
  container.attr('id', `comp-${fragmentId}`)

  if (fragmentDivision === 'front') {
    container.attr('class', 'front-component')
  } else if (fragmentDivision === 'back') {
    container.attr('class', 'back-component')
  } else {
    container.attr('class', `body-${fragmentSubcategory}`)
  }

  if (hasTitles) {
    header = $('<header/>')
    container.append(header)
  }

  const replaceWithBlockquote = className => (i, elem) => {
    const $elem = $(elem)

    const blockquote = $(`<blockquote class="${className}"/>`).append(
      $elem.contents(),
    )

    $elem.replaceWith(blockquote)
  }

  const replaceWithPre = className => (i, elem) => {
    const $elem = $(elem)
    const { source } = $elem[0].attribs
    const { language } = $elem[0].attribs

    const highLighter = hljs.highlight(language, source)
    const pre = $(`<pre class="${language}"/>`).append(highLighter.value)

    $elem.replaceWith(pre)
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
    if (className === 'cst') {
      header.append(p)
      $elem.remove()
    }
  }
  const replaceWithH1 = className => (i, elem) => {
    const $elem = $(elem)

    const h1 = $('<h1/>')
      .attr('class', className)
      .text($elem.text())

    $elem.replaceWith(h1)
    if (className === 'ct') {
      header.append(h1)
      $elem.remove()
    }
  }
  const replaceWithList = className => (i, elem) => {
    const $elem = $(elem)

    const list = $('<ol/>')
      .attr('class', className)
      .append($elem.contents())

    $elem.replaceWith(list)
  }

  const replaceWithFigure = className => (i, elem) => {
    const $elem = $(elem)

    const figure = $(
      `<figure><img src="${$elem[0].attribs.src}"/><figcaption>${
        $elem[0].attribs.figcaption
      }</figcaption></figure>`,
    )

    $elem.replaceWith(figure)
  }

  // replace custom HTML elements
  $('extract').each(replaceWithBlockquote('ex')) // delete when xsweet is updated
  $('extract-prose').each(replaceWithBlockquote('ex'))
  $('extract-poetry').each(replaceWithBlockquote('px'))
  $('epigraph-poetry').each(replaceWithBlockquote('sepo'))
  $('epigraph-prose').each(replaceWithBlockquote('sep'))
  $('bibliography-entry').each(replaceWithParagraph('bibliography-entry'))
  $('comment').each(replaceWithText)
  // $('chapter-number').each(replaceWithParagraph('sc-chapter-number'))
  $('chapter-title').each(replaceWithH1('ct'))
  $('chapter-subtitle').each(replaceWithParagraph('cst'))
  $('source-note').each(replaceWithParagraph('exsn'))
  $('ol[styling="qa"]').each(replaceWithList('di'))
  $('ol[styling="unstyled"]').each(replaceWithList('none'))

  $('figure').each(replaceWithFigure(''))
  $('script').each(replaceWithPre('pre'))

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
  $('highlighter').each((i, elem) => {
    const $elem = $(elem)
    $elem.replaceWith($elem.text())
  })
  $('ornament').each((i, elem) => {
    const $elem = $(elem)
    const hr = $('<hr>')
    $elem.replaceWith(hr)
  })
  $('inline-note').each((i, elem) => {
    const $elem = $(elem)
    const number = $elem.attr('number')
    const sanitized = `[note ${number}]`
    $elem.replaceWith(sanitized)
  })
  const hasNotes = $('note').length > 0

  if (hasNotes) {
    const notesSectionHeader = notesPart('<h2/>')
      .attr('class', 'note-chapterTitle')
      .html(fragmentTitle)
    notesPart('section').append(notesSectionHeader)

    const notesList = notesPart('<ol/>')
    // replace inline notes with endnotes
    $('note').each((i, elem) => {
      const $elem = $(elem)

      const id = $elem.attr('data-id')
      const noteNumber = `${i + 1}.`
      const element = $('#notes').find($(`#container-${id}`))
      let content = ''

      for (let i = 0; i < element.children().length; i += 1) {
        const currentElement = $(element.children().get(i))
        if (i < element.children().length - 1) {
          content += `${currentElement.text()}<br>`
        } else {
          content += `${currentElement.text()}`
        }
      }
      const li = notesPart('<li/>').html(content)
      li.attr('id', id)
      notesList.append(li)
      const callout = $(`
      <a class="inline-note-callout" href="#${id}">
        <sup>${noteNumber}</sup>
      </a>
    `)

      $elem.replaceWith(callout)
    })
    $('#notes').remove()
    notesPart('section').append(notesList)
  }

  $('p').each((i, elem) => {
    const $elem = $(elem)
    if ($elem.attr('data-id')) {
      $elem.removeAttr('data-id')
    }
  })

  let bodyContent

  if ($('#main').length > 0) {
    bodyContent = $('#main').contents()
    container.append(bodyContent)
  } else {
    // For the case of extracted Notes
    bodyContent = $('section[data-type="notes"]').contents()
    container.append(bodyContent)
  }
  body.empty()
  body.append(container)
}
