const cheerio = require('cheerio')

const create = async (book, parts, resourceRoot, stylesRoot, fontsRoot) => {
  const output = cheerio.load(
    `<!DOCTYPE html><html><head><title>${book.title}</title>
    <meta charset="UTF-8"></head><body class="hyphenate" lang="en-us"><section class="titlepage"><header><h1 class="booktitle">${book.title}</h1></header></section></body></html>`,
  )
  const TOC = createTOC(parts)
  output('body').append(TOC.html())
  for (let i = 0; i < parts.length; i += 1) {
    output('body').append(parts[i].content)
  }
  output('img').each((index, img) => {
    const $img = output(img)

    const tempUri = $img.attr('src')

    $img.attr('src', `/uploads/${tempUri}`)
  })
  return output
}

const createTOC = parts => {
  const $ = cheerio.load('<section class="toc" id="comp-toc-0"/>')
  const title = $('<header><h1 class="ct">Contents</h1></header>')
  $('section').append(title)
  const ol = $('<ol/>')
  $('section').append(ol)
  for (let i = 0; i < parts.length; i += 1) {
    const tocItem = $(`<li/>`)
    tocItem.attr('class', `toc-${parts[i].division} toc-${parts[i].type}`)
    const anchor = $('<a/>')
    anchor.attr('href', `#comp-${parts[i].id}`)
    anchor.text(parts[i].title)
    tocItem.append(anchor)
    ol.append(tocItem)
  }
  return $
}

module.exports = { create }
