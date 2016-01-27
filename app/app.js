import React from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import { configure, AuthGlobals } from 'redux-auth'
import { Provider } from 'react-redux'

let store = configureStore()

class App extends React.Component {
  render () {
    return (
      <div>
        <AuthGlobals />
        <Root store={store} />
      </div>
    )
  }
}

function renderApp ({cookies, isServer, currentLocation} = {}) {
  // configure redux-auth before rendering the page
  return store.dispatch(configure(
    { apiUrl: 'http://localhost:3000/api' },
    {isServer, cookies, currentLocation}
  )).then(({redirectPath, blank} = {}) => {
    if (blank) {
      // if `blank`, this is an OAuth redirect, it should not be rendered
      return <noscript />
    } else {
      return (
        <Provider store={store} key='provider'>
          <App />
        </Provider>
      )
    }
  })
}

// Client-side, currently the only side
renderApp().then(appComponent => {
  render(appComponent, document.getElementById('root'))
})

