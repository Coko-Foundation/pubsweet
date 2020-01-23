const STATUS = require('http-status-codes')
const path = require('path')
const config = require('config')

const mockComponentPath = path.resolve(__dirname, 'mocks', 'mock_component.js')
config.pubsweet.components.push(mockComponentPath)

const api = require('./helpers/api')

describe('App startup', () => {
  it('should register components on config.pubsweet.components', async () => {
    const res = await api.request.get('/mock-component')
    expect(res.status).toBe(STATUS.OK)
  })

  it('loads graphql types and resolvers', async () => {
    const res = await api.graphql.query('{ test }')
    expect(res.body).toEqual({ data: { test: 'OK' } })
  })
})
