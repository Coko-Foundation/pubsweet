const supertest = require('supertest')
const app = require('../../src/app')(require('express')())

const request = supertest(app)

const upload = {
  post: (file, token) => {
    const req = request.post('/api/upload').attach('file', file)

    return token ? req.set('Authorization', `Bearer ${token}`) : req
  },
  get: (path, token) => {
    const req = request.get(path)

    return token ? req.set('Authorization', `Bearer ${token}`) : req
  },
}

const graphql = {
  query: (query, variables, token) => {
    const req = request.post('/graphql').send({ query, variables })
    if (token) req.set('Authorization', `Bearer ${token}`)
    return req
  },
}

module.exports = {
  upload,
  graphql,
  request,
  app,
}
