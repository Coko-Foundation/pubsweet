/* eslint-disable func-names-any */

function User(properties) {
  this.type = 'user'
  this.email = properties.email
  this.username = properties.username
  this.password = properties.password
  this.roles = properties.roles
  this.title = properties.title
  this.affiliation = properties.affiliation
  this.firstName = properties.firstName
  this.lastName = properties.lastName
  this.admin = properties.admin
}

User.prototype.save = jest.fn(function saveUser() {
  this.id = '111222'
  return Promise.resolve(this)
})

module.exports = User
