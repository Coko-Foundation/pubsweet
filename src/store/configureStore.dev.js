import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import DevTools from '../components/DevTools'
import reducers from '../reducers'

require('../components/reducers').forEach(
  componentReducers => Object.assign(reducers, componentReducers)
)

export default function configureStore (history, initialState) {
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  const middleware = [
    applyMiddleware(thunk),
    process.env.REDUXLOG_OFF ? null : applyMiddleware(createLogger()),
    applyMiddleware(routerMiddleware(browserHistory)),
    DevTools.instrument()
  ].filter(value => value !== null)

  const store = createStore(
    reducer,
    initialState,
    compose(...middleware)
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
