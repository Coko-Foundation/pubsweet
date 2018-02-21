process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const httpMocks = require('node-mocks-http')
const fixtures = require('./fixtures/fixtures')
const UserMock = require('./mocks/User')

const buildModels = user => {
  const models = {
    User: {},
  }
  UserMock.findByEmail = jest.fn(
    () =>
      user instanceof Error ? Promise.reject(user) : Promise.resolve(user),
  )

  models.User = UserMock
  return models
}

const editorInChiefUser = fixtures.users.editorInChief
const body = {
  email: editorInChiefUser.email,
  firstName: editorInChiefUser.firstName,
  lastName: editorInChiefUser.lastName,
  title: editorInChiefUser.email,
  affiliation: editorInChiefUser.email,
  password: editorInChiefUser.password,
  token: editorInChiefUser.passwordResetToken,
  isConfirmed: false,
}

const notFoundError = new Error()
notFoundError.name = 'NotFoundError'
notFoundError.status = 404

describe('Password reset after invite route handler', () => {
  it('should return success when the body is correct', async () => {
    const req = httpMocks.createRequest({ body })
    const res = httpMocks.createResponse()
    const models = buildModels(editorInChiefUser)
    await require('../routes/reset')(models)(req, res)

    expect(res.statusCode).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.firstName).toEqual(body.firstName)
    expect(data.email).toEqual(body.email)
    editorInChiefUser.passwordResetToken = 'token123'
  })
  it('should return an error when some parameters are missing', async () => {
    delete body.email
    const req = httpMocks.createRequest({ body })

    const res = httpMocks.createResponse()
    const models = buildModels(editorInChiefUser)
    await require('../routes/reset')(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('missing required params')
    body.email = editorInChiefUser.email
  })
  it('should return an error when the password is too small', async () => {
    body.password = 'small'
    const req = httpMocks.createRequest({ body })

    const res = httpMocks.createResponse()
    const models = buildModels(editorInChiefUser)
    await require('../routes/reset')(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual(
      'password needs to be at least 7 characters long',
    )
    body.password = editorInChiefUser.password
  })
  it('should return an error when user is not found', async () => {
    const req = httpMocks.createRequest({ body })
    const error = new Error()
    error.name = 'NotFoundError'
    error.status = 404
    const res = httpMocks.createResponse()
    const models = buildModels(error)
    await require('../routes/reset')(models)(req, res)
    expect(res.statusCode).toBe(404)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('user not found')
  })
  it('should return an error when there is a validation problem', async () => {
    const req = httpMocks.createRequest({ body })
    const error = new Error()
    error.name = 'ValidationError'
    error.status = 400
    error.details = []
    error.details.push({ message: 'validation error' })
    const res = httpMocks.createResponse()
    const models = buildModels(error)
    await require('../routes/reset')(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('validation error')
  })
  it('should return an error when there is a system problem', async () => {
    const req = httpMocks.createRequest({ body })
    const error = new Error()
    error.details = []
    error.details.push({ message: 'internal server error' })
    const res = httpMocks.createResponse()
    const models = buildModels(error)
    await require('../routes/reset')(models)(req, res)
    expect(res.statusCode).toBe(500)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('internal server error')
  })
  it('should return an error when the user is already confirmed', async () => {
    editorInChiefUser.isConfirmed = true
    const req = httpMocks.createRequest({ body })
    const res = httpMocks.createResponse()
    const models = buildModels(editorInChiefUser)
    await require('../routes/reset')(models)(req, res)
    expect(res.statusCode).toBe(400)
    const data = JSON.parse(res._getData())
    expect(data.error).toEqual('User is already confirmed')
    editorInChiefUser.isConfirmed = false
  })
})
