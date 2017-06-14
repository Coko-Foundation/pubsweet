module.exports = {
  frontend: {
    components: [
      () => require('./Signup')
    ],
    actions: () => require('./actions'),
    reducers: () => require('./reducers')
  }
}
