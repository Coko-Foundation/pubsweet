module.exports = {
  frontend: {
    components: [() => require('./SignupContainer')],
    actions: () => require('./actions'),
    reducers: () => require('./reducers'),
  },
}
