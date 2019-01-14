module.exports = {
  frontend: {
    components: [() => require('./components')],
  },
  server: () => require('./server/formRequestBackend'),
}
