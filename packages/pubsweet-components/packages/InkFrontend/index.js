module.exports = {
  frontend: {
    components: [
      () => require('./InkFrontendContainer')
    ],
    actions: () => require('./actions'),
    reducers: () => require('./reducers')
  }
}
