require('./localStorage')()

const token = () => global.window.localStorage.getItem('token')

const login = user => new Promise(
  (resolve, reject) => {
    const loginactions = require.requireActual('pubsweet-component-login/actions')
    const T = require.requireActual('pubsweet-component-login/types')
    loginactions.loginUser(user)(result => {
      if (result.type === T.LOGIN_SUCCESS) {
        resolve(result)
      } else if (result.type === T.LOGIN_FAILURE) {
        reject(result)
      }
    })
  }
)

const logout = () => new Promise(
  (resolve) => {
    const loginactions = require.requireActual('pubsweet-component-login/actions')
    const T = require.requireActual('pubsweet-component-login/types')
    loginactions.logoutUser()(result => {
      // set a mock token for basic unit tests
      global.window.localStorage.setItem('token', 'mocktoken')
      if (result.type === T.LOGOUT_SUCCESS) resolve()
    })
  }
)

module.exports = {
  token: token,
  login: login,
  logout: logout
}
