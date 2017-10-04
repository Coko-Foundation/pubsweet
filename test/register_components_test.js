const STATUS = require('http-status-codes')
const request = require('supertest')
const api = require('./helpers/api')
const path = require('path')

const mockComponentPath = path.join('test', 'mocks', 'mock_component.js')

const config = require('config')
config['pubsweet'] = { components: [mockComponentPath] }

describe('App startup', () => {
  it('should register components on config.pubsweet.components', async () => {
    const res = await request(api.api).get('/mock-component')
    console.log(res.status, res.body)
    expect(res.status).toBe(STATUS.OK)
  })
})
