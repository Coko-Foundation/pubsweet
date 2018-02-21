module.exports = {
  backend: () => app => require('./src/Invite')(app),
}
