module.exports = {
  frontend: {
    components: [
      () => require('./Signup.jsx')
    ],
    actions: () => require('./actions'),
    reducers: () => require('./reducers')
  }
}
