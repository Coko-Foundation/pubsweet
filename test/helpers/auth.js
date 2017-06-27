const localStorage = require('./localStorage')()
const api = require('../../src/helpers/api')

const login = async credentials => {
  const response = await api.create('/users/authenticate', credentials)
  const { token } = await response.json()
  localStorage.setItem('token', token)
}

const logout = async () => {
  // set a mock token for basic unit tests
  localStorage.setItem('token', 'mocktoken')
}

module.exports = {
  token: () => localStorage.getItem('token'),
  login: login,
  logout: logout
}
