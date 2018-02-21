process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')
const fixtures = require('./fixtures/fixtures')

const buildModels = user => {
  const models = {
    User: {
      findByEmail: jest.fn(
        () =>
          user instanceof Error ? Promise.reject(user) : Promise.resolve(user),
      ),
    },
  }

  return models
}
const user = fixtures.users.editorInChief
const query = {
  email: user.email,
  token: user.passwordResetToken,
}
describe('Get inivte data route handler', () => {
  it('should return success email and token are correct', async () => {
    const req = httpMocks.createRequest()
    req.query = query
    const res = httpMocks.createResponse()
    const models = buildModels(user)
    await require('../routes/get')(models)(req, res)

    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.firstName).toEqual(user.firstName)
  })
  it('should return an error when some parameters are missing', async () => {
    delete query.email
    const req = httpMocks.createRequest()
    req.query = query

    const res = httpMocks.createResponse()
    const models = buildModels(user)
    await require('../routes/get')(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('missing required params')
    query.email = user.email
  })
  it('should return an error when tokens do not match', async () => {
    query.token = 'wrongToken'
    const req = httpMocks.createRequest()
    req.query = query

    const res = httpMocks.createResponse()
    const models = buildModels(user)
    await require('../routes/get')(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('invalid request')
    query.token = user.passwordResetToken
  })
  it('should return an error when user is not found', async () => {
    const req = httpMocks.createRequest()
    req.query = query
    const error = new Error()
    error.name = 'NotFoundError'
    error.status = 404
    const res = httpMocks.createResponse()
    const models = buildModels(error)
    await require('../routes/get')(models)(req, res)
    expect(res.statusCode).toBe(404)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('user not found')
  })
  it('should return an error when there is a validation problem', async () => {
    const req = httpMocks.createRequest()
    req.query = query
    const error = new Error()
    error.name = 'ValidationError'
    error.status = 400
    error.details = []
    error.details.push({ message: 'validation error' })
    const res = httpMocks.createResponse()
    const models = buildModels(error)
    await require('../routes/get')(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('validation error')
  })
  it('should return an error when there is a system problem', async () => {
    const req = httpMocks.createRequest()
    req.query = query
    const error = new Error()
    error.details = []
    error.details.push({ message: 'internal server error' })
    const res = httpMocks.createResponse()
    const models = buildModels(error)
    await require('../routes/get')(models)(req, res)
    expect(res.statusCode).toBe(500)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('internal server error')
  })
})
