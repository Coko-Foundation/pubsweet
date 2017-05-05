module.exports = {
  frontend: {
    components: [
      () => require('./InkFrontend.jsx')
    ],
    actions: () => require('./actions'),
    reducers: () => require('./reducers')
  }
}
