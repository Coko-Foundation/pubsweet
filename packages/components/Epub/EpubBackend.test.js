const express = require('express')
const supertest = require('supertest')

const component = require('.')

function makeApp(response) {
  const app = express()
  // mock DB
  app.locals.models = {
    Collection: {
      find: jest.fn(
        () =>
          response instanceof Error
            ? Promise.reject(response)
            : Promise.resolve(response),
      ),
    },
  }
  // register component
  component.server()(app)
  // create test wrapper
  return supertest(app)
}

describe('/collections/*/epub route', () => {
  it('sends an attachment', () => {
    const collection = {
      id: 'col1',
      title: 'Test thing',
      getFragments: () => [
        {
          title: 'One thing',
          source: '<p>In depth</p>',
          division: 'body',
          subCategory: 'part',
          id: 'first_',
        },
      ],
    }
    return makeApp(collection)
      .get('/api/collections/234/epub?converter=default')
      .expect(200)
      .expect(
        'Content-disposition',
        'attachment; filename="collection-234.epub"',
      )
  })

  it('errors if DB call fails', () => {
    const error = new Error('Ops!')
    return makeApp(error)
      .get('/api/collections/234/epub')
      .expect(500)
  })
})
