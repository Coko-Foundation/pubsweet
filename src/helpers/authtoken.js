// TODO: This will break when rendered on a server
module.exports = () => {
  const localStorage = window.localStorage
    || global.window.localStorage
    || undefined
  return localStorage ? localStorage.getItem('token') : undefined
}
