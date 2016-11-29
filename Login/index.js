module.exports = {
  frontend: {
    components: [
      () => require('./Login.jsx')
    ],
    actions: () => require('./actions'),
    reducers: () => require('./reducers')
  }
}
