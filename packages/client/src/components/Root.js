import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'

import StyleRoot from '../helpers/StyleRoot'

const serverProtocol = process.env.SERVER_PROTOCOL
const serverHost = process.env.SERVER_HOST
const serverPort = process.env.SERVER_PORT
const serverServeClient = process.env.SERVER_SERVE_CLIENT

let serverUrl, serverUrlWithProtocol

// can't build a valid url without these two
if (serverProtocol && serverHost) {
  serverUrl = `${serverHost}${serverPort ? `:${serverPort}` : ''}`
  serverUrlWithProtocol = `${serverProtocol}://${serverUrl}`
}

if (!serverUrl || serverServeClient) {
  serverUrl = window.location.host
  serverUrlWithProtocol = `${window.location.protocol}//${serverUrl}`
}

// See https://github.com/apollographql/apollo-feature-requests/issues/6#issuecomment-465305186
export function stripTypenames(obj) {
  Object.keys(obj).forEach(property => {
    if (
      obj[property] !== null &&
      typeof obj[property] === 'object' &&
      !(obj[property] instanceof File)
    ) {
      delete obj.property
      const newData = stripTypenames(obj[property], '__typename')
      obj[property] = newData
    } else if (property === '__typename') {
      delete obj[property]
    }
  })
  return obj
}

// Construct an ApolloClient. If a function is passed as the first argument,
// it will be called with the default client config as an argument, and should
// return the desired config.
const makeApolloClient = (makeConfig, connectToWebSocket) => {
  const uploadLink = createUploadLink({
    uri: `${serverUrlWithProtocol}/graphql`,
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

  const removeTypename = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      operation.variables = stripTypenames(operation.variables)
    }
    return forward(operation)
  })

  let link = ApolloLink.from([removeTypename, authLink, uploadLink])

  if (connectToWebSocket) {
    const wsProtocol = serverProtocol === 'https' ? 'wss' : 'ws'
    const wsLink = new WebSocketLink({
      uri: `${wsProtocol}://${serverUrl}/subscriptions`,
      options: {
        reconnect: true,
        connectionParams: () => ({ authToken: localStorage.getItem('token') }),
      },
    })
    link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      link,
    )
  }
  const config = {
    link,
    cache: new InMemoryCache(),
  }
  return new ApolloClient(makeConfig ? makeConfig(config) : config)
}

const Root = ({
  makeApolloConfig,
  routes,
  theme,
  connectToWebSocket = true,
}) => (
  <div>
    <Normalize />
    <ApolloProvider
      client={makeApolloClient(makeApolloConfig, connectToWebSocket)}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <StyleRoot>{routes}</StyleRoot>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </div>
)

Root.propTypes = {
  routes: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
}

export default Root
