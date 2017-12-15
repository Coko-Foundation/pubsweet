module.exports = {
  frontend: {
    components: [() => require('./LoginContainer')],
    actions: () => require('./actions'),
    reducers: () => require('./reducers'),
  },
}
