module.exports = () => {
  const LocalStorage = require('node-localstorage').LocalStorage
  global.window.localStorage = new LocalStorage('./scratch')
  global.window.localStorage.setItem('token', 'mocktoken')
  return global.window.localStorage
}
