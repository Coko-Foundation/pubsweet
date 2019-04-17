import React from 'react'
import { compose } from 'recompose'

const AppContext = React.createContext(null)

export const connectToContext = () => WrappedComponent => {
  const ConnectedContextComponent = props => (
    <AppContext.Consumer>
      {context => <WrappedComponent {...props} {...context} />}
    </AppContext.Consumer>
  )
  return compose()(ConnectedContextComponent)
}

export const createContext = data => WrappedComponent =>
  compose()(props => (
    <AppContext.Provider value={data || props}>
      <WrappedComponent {...props} />
    </AppContext.Provider>
  ))
