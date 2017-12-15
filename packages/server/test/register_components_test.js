const STATUS = require('http-status-codes')
const request = require('supertest')
const path = require('path')
const config = require('config')

const mockComponentPath = path.join(
  process.cwd(),
  'test',
  'mocks',
  'mock_component.js',
)
config.pubsweet = { components: [mockComponentPath] }

const api = require('./helpers/api')

describe('App startup', async () => {
  it('should register components on config.pubsweet.components', async () => {
    const res = await request(api.api).get('/mock-component')
    expect(res.status).toBe(STATUS.OK)
  })
})
