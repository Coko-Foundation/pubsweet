import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import StyleRoot, { injectGlobalStyles } from '../helpers/StyleRoot'

injectGlobalStyles()

// Construct an ApolloClient. If a function is passed as the first argument,
// it will be called with the default client config as an argument, and should
// return the desired config.
const makeApolloClient = makeConfig => {
  const uploadLink = createUploadLink()
  const httpLink = createHttpLink()
  const wsLink = new WebSocketLink({
    uri: `ws://${window.location.hostname}:5000/subscriptions`,
    options: {
      reconnect: true,
    },
  })
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    authLink.concat(uploadLink, httpLink),
  )
  const config = {
    link,
    cache: new InMemoryCache(),
  }
  return new ApolloClient(makeConfig ? makeConfig(config) : config)
}

const Root = ({ makeApolloConfig, store, history, routes, theme }) => (
  <ApolloProvider client={makeApolloClient(makeApolloConfig)}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <StyleRoot>{routes}</StyleRoot>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>
)

Root.propTypes = {
  routes: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default Root
