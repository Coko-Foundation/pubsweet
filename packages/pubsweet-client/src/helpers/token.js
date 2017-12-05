module.exports = () => {
  const localStorage = window.localStorage || global.window.localStorage

  if (!localStorage) throw new Error('localstorage is not available')

  return localStorage.getItem('token')
}
