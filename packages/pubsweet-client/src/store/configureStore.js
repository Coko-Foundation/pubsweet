import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { reducer as formReducer } from 'redux-form'
import config from 'config'
import reducers from '../reducers'

require('../components/reducers').forEach(componentReducers =>
  Object.assign(reducers, componentReducers),
)

function createConfigureStore(env) {
  return function configureStore(
    history,
    initialState = {},
    customReducers = {},
    customMiddlewares = [],
  ) {
    const reducer = combineReducers({
      ...reducers,
      form: formReducer,
      routing: routerReducer,
      ...customReducers,
    })

    let logger
    if (config['pubsweet-client']['redux-log'] && env !== 'production') {
      logger = applyMiddleware(createLogger())
    }

    const middleware = [
      applyMiddleware(thunk),
      logger,
      applyMiddleware(routerMiddleware(history)),
      ...customMiddlewares.map(mw => applyMiddleware(mw)),
    ].filter(value => value)

    // https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
      reducer,
      initialState,
      composeEnhancers(...middleware),
    )

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers')
        store.replaceReducer(nextRootReducer)
      })
    }

    return store
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports = createConfigureStore('production')
} else {
  module.exports = createConfigureStore('development')
}
