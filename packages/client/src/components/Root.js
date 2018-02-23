import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import StyleRoot, { injectGlobalStyles } from '../helpers/StyleRoot'

injectGlobalStyles()

const Root = ({ store, history, routes, theme }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <StyleRoot>{routes}</StyleRoot>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
)

Root.propTypes = {
  routes: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default Root
