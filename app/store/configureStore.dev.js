import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import DevTools from '../components/DevTools'
import * as reducers from '../reducers'

export default function configureStore (history, initialState) {
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      applyMiddleware(createLogger()),
      applyMiddleware(routerMiddleware(browserHistory)),
      DevTools.instrument()
    )
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
