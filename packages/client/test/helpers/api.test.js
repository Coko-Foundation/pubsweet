import nock from 'nock'
import endpoint from '../../src/helpers/endpoint'

// must be require, not import, due to mocking global above
const api = require('../../src/helpers/api')

describe('API helper', () => {
  beforeAll(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => 'tok123')
  })

  it('makes a GET request', async () => {
    nock(endpoint)
      .get('/thing')
      .reply(200, 'A thing', { 'content-type': 'text/plain' })

    const actual = await api.get('/thing')
    expect(actual).toBe('A thing')
  })

  it('makes a POST request', async () => {
    nock(endpoint)
      .post('/thing', {
        some: 'data',
      })
      .reply(200, 'A new thing', { 'content-type': 'text/plain' })

    const actual = await api.create('/thing', { some: 'data' })
    expect(actual).toBe('A new thing')
  })

  it('makes a PATCH request', async () => {
    nock(endpoint)
      .patch('/thing/1', {
        some: 'data',
      })
      .reply(200, 'A partially updated thing', { 'content-type': 'text/plain' })

    const actual = await api.update('/thing/1', { some: 'data' })
    expect(actual).toBe('A partially updated thing')
  })

  it('makes a PUT request', async () => {
    nock(endpoint)
      .put('/thing/1', {
        some: 'data',
      })
      .reply(200, 'An updated thing', { 'content-type': 'text/plain' })

    const actual = await api.update('/thing/1', { some: 'data' }, true)
    expect(actual).toBe('An updated thing')
  })

  it('makes a DELETE request', async () => {
    nock(endpoint)
      .delete('/thing/1')
      .reply(200, 'No thing', { 'content-type': 'text/plain' })

    const actual = await api.remove('/thing/1')
    expect(actual).toBe('No thing')
  })

  it('automatically parses JSON response', async () => {
    const expected = { oh: 'yeah' }
    nock(endpoint)
      .get('/thing')
      .reply(200, expected, { 'content-type': 'application/json' })

    const actual = await api.get('/thing')
    expect(actual).toEqual(expected)
  })

  it('includes token in header', async () => {
    nock(endpoint, {
      reqheaders: {
        authorization: 'Bearer tok123',
      },
    })
      .get('/thing')
      .reply(200, 'OK', { 'content-type': '' })

    const actual = await api.get('/thing')
    expect(actual).toEqual('OK')
  })

  it('wraps HTTP errors', async () => {
    nock(endpoint)
      .get('/thing')
      .reply(500, 'Yikes!', { 'content-type': '' })

    try {
      await api.get('/thing')
    } catch (e) {
      expect(e.message).toBe('Internal Server Error')
      expect(e.response).toBe('Yikes!')
      expect(e.statusCode).toBe(500)
    }
    expect.hasAssertions()
  })

  it('optionally returns raw response', async () => {
    nock(endpoint)
      .get('/thing')
      .reply(204)

    const response = await api.default('/thing', {
      method: 'GET',
      parse: false,
    })

    expect(response).toMatchObject({
      ok: true,
      statusText: 'No Content',
    })
  })
})
