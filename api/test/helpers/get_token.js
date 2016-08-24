const request = require('supertest-as-promised')
const api = require('../../api')
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
