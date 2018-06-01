module.exports = {
  server: () => app => require('./PasswordResetBackend')(app),
}
