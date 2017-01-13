const request = require('supertest')
const api = require('../src')()
const STATUS = require('http-status-codes')

module.exports = user => {
  return request(
    api
  ).post(
    '/api/users/authenticate'
  ).send(
    user
  ).expect(
    STATUS.CREATED
  ).then(
    res => res.body.token
  )
}
