module.exports = {
  backend: () => app => require('./PasswordResetBackend')(app),
}
