module.exports = {
  frontend: {
    components: [
      {
        ApplicationWithModal: () => require('./src/ApplicationWithModal'),
      },
    ],
    actions: () => require('./src/actions'),
    reducers: () => require('./src/reducers'),
  },
}
