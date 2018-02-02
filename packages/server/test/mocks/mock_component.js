const STATUS = require('http-status-codes')

const mockComponent = {
  backend: () => app => {
    app.use('/mock-component', (req, res, next) =>
      res.status(STATUS.OK).json({ ok: '!' }),
    )
  },
  typeDefs: `extend type Query { test: String }`,
  resolvers: { Query: { test: () => 'OK' } },
}

module.exports = mockComponent
