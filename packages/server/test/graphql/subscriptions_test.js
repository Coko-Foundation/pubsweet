/**
 * TODO test with
 * ./node_modules/.bin/jest packages/server/test/graphql/subscriptions_test.js
 */

const User = require('../../src/models/User')
const cleanDB = require('../helpers/db_cleaner')
const fixtures = require('../fixtures/fixtures')
const authentication = require('../../src/authentication')
const startServer = require('../../src/')

const WebSocket = require('ws')
const { ApolloClient } = require('apollo-client')
const { createHttpLink } = require('apollo-link-http')
const { WebSocketLink } = require('apollo-link-ws')
const { split } = require('apollo-link')
const { getMainDefinition } = require('apollo-utilities')
const { InMemoryCache } = require('apollo-cache-inmemory')
const gql = require('graphql-tag')

global.fetch = () => {}

describe('Subscription test', () => {
  let token
  let user
  let server
  let apolloClient
  beforeAll(async () => {
    /* TODO will this even work */
    server = await startServer()
  })
  beforeEach(async () => {
    await cleanDB()
    user = await new User(fixtures.adminUser).save()
    token = authentication.token.create(user)
    const wsLink = new WebSocketLink({
      uri: `ws://localhost/subscriptions`,
      options: {
        connectionParams: {
          authToken: token,
        },
      },
      webSocketImpl: WebSocket,
    })
    const httpLink = createHttpLink()
    const link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink,
    )
    const config = {
      link,
      cache: new InMemoryCache(),
    }
    /* TODO this will not connect to websocket */
    apolloClient = new ApolloClient(config)
  })
  afterAll(async () => {
    server.close()
  })
  it('works', async () => {
    const subscriptionPromise = new Promise((resolve, reject) => {
      apolloClient
        .subscribe({
          query: gql`
            subscription onUploadProgress {
              uploadProgress
            }
          `,
        })
        .subscribe({
          next: resolve,
          error: reject,
        })
    })
    const res = await subscriptionPromise
  })
})
