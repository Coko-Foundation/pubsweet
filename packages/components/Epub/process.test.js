const cheerio = require('cheerio')
const converters = require('./converters')
const processFragment = require('./process')

const previewer = 'vivliostyle'

test('converts source to html', () => {
  const fragment = {
    title: 'A Test',
    division: 'body',
    subCategory: 'part',
    number: 3,
    source: `
      <div>
          <h1>A Test</h1>
          <p>Test</p>
      </div>
    `,
    id: '1',
  }

  const book = {
    title: 'Test Book',
    identifier:
      '65ac5abe353ef4d32f1ce55abfe665185d58d811883b1715032b8ed70a8cc1e1',
  }

  const styles = ['test.css']
  const activeConverters = [
    converters['wax-vivliostyle-default'],
    converters['wax-vivliostyle-ucp'],
    converters['wax-paged-ucp'],
    converters['wax-paged-default'],
  ]
  const notesPart = cheerio.load(
    '<html><body><section data-type="notes"><h1 class="ct">Notes</h1></section></body></html>',
  )

  const { title, content } = processFragment({
    styles,
    activeConverters,
    book,
    notesPart,
    previewer,
  })(fragment)

  expect(title).toBe('A Test')

  const $ = cheerio.load(content)

  const doc = $('html')

  expect(doc.attr('xmlns')).toBe('http://www.w3.org/1999/xhtml')

  expect(doc.attr('xmlns:epub')).toBe('http://www.idpf.org/2007/ops')

  expect($('link[rel=stylesheet]').attr('href')).toBe('test.css')
})
