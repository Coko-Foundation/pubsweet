const localStorage = require('./localStorage')()

const API_ENDPOINT = CONFIG['pubsweet-server'].API_ENDPOINT

const login = async credentials => {
  const response = await fetch(API_ENDPOINT + '/users/authenticate', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(credentials)
  })

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
