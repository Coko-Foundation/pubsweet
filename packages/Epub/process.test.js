const cheerio = require('cheerio')
const converters = require('./converters')
const processFragment = require('./process')

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
    `
  }

  const book = {
    title: 'Test Book',
    identifier: '65ac5abe353ef4d32f1ce55abfe665185d58d811883b1715032b8ed70a8cc1e1'
  }

  const styles = ['test.css']
  const activeConverters = [converters['wax']]

  const { title, content } = processFragment({styles, activeConverters, book})(fragment)

  expect(title).toBe('A Test')

  const $ = cheerio.load(content)

  const doc = $('html')

  expect(doc.attr('xmlns'))
    .toBe('http://www.w3.org/1999/xhtml')

  expect(doc.attr('xmlns:epub'))
    .toBe('http://www.idpf.org/2007/ops')

  expect($('link[rel=stylesheet]').attr('href'))
    .toBe('test.css')
})
