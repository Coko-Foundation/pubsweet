module.exports = {
  frontend: {
    components: [
      () => require('./InkFrontend')
    ],
    actions: () => require('./actions'),
    reducers: () => require('./reducers')
  }
}
