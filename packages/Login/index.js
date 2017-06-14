module.exports = {
  frontend: {
    components: [
      () => require('./Login')
    ],
    actions: () => require('./actions'),
    reducers: () => require('./reducers')
  }
}
