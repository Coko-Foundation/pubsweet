const STATUS = require('http-status-codes')

const mockComponent = {
  server: () => app => {
    app.use('/mock-component', (req, res, next) =>
      res.status(STATUS.OK).json({ ok: '!' }),
    )
  },
  typeDefs: `extend type Query { test: String, ctxreq: String, ctxres: String }`,
  resolvers: {
    Query: {
      test: () => 'OK',
      ctxreq: (_, __, ctx) => ctx.req.method,
      ctxres: (_, __, ctx) => ctx.res.req.method,
    },
  },
}

module.exports = mockComponent
