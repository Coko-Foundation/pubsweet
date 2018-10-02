import React from 'react'

export const AppContext = React.createContext(null)

export const createContext = data => WrappedComponent => (
  <AppContext.provider value={data}>
    <WrappedComponent />
  </AppContext.provider>
)
