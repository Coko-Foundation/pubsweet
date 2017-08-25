import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { reducer as formReducer } from 'redux-form'

import reducers from '../reducers'

require('../components/reducers').forEach(
  componentReducers => Object.assign(reducers, componentReducers)
)

export default function configureStore (history, initialState) {
  const reducer = combineReducers({
    ...reducers,
    form: formReducer,
    routing: routerReducer
  })

  const middleware = [
    applyMiddleware(thunk),
    process.env.REDUXLOG_OFF ? null : applyMiddleware(createLogger()),
    applyMiddleware(routerMiddleware(browserHistory))
  ].filter(value => value !== null)

  // https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(...middleware)
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
