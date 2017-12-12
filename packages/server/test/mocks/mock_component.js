const STATUS = require('http-status-codes')

const mockComponent = { backend: () => app => {
  app.use('/mock-component', (req, res, next) => {
    return res.status(STATUS.OK).json({ok: '!'})
  })
} }

module.exports = mockComponent