describe('configureStore', () => {
  afterEach(() => jest.resetModules())

  it('allows initialization of store with custom initialState, reducers and middleware', () => {
    global.PUBSWEET_COMPONENTS = []

    const configureStore = require('../../src/store/configureStore')

    const customHistory = {}
    const customInitialState = { collections: ['initial'] }

    const customReducers = {
      test: (state, action) => ({
        ...state,
        fired: action.fired,
      }),
    }

    const customMiddlewares = [
      () => next => action => {
        action.fired = true
        return next(action)
      },
    ]

    const store = configureStore(
      customHistory,
      customInitialState,
      customReducers,
      customMiddlewares,
    )

    expect(store.getState().collections[0]).toBe(
      customInitialState.collections[0],
    )
    store.dispatch({ type: 'TEST', fired: false })
    expect(store.getState().test.fired).toBe(true)
  })
})
