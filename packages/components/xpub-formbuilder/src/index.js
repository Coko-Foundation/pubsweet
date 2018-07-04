module.exports = {
  frontend: {
    components: [() => require('./components')],
    actions: () => ({
      getForms: require('./redux/FormBuilder').getForms,
    }),
    reducers: {
      formBuilder: () => require('./redux/FormBuilder').default,
    },
  },
  server: () => require('./server/formRequestBackend'),
}
