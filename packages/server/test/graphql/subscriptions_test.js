const User = require('../../src/models/User')
const cleanDB = require('../helpers/db_cleaner')
const fixtures = require('../fixtures/fixtures')
const authentication = require('../../src/authentication')
const { startServer } = require('../../src')

const WebSocket = require('ws')
const { ApolloClient } = require('apollo-client')
const { createHttpLink } = require('apollo-link-http')
const { WebSocketLink } = require('apollo-link-ws')
const { split } = require('apollo-link')
const { getMainDefinition } = require('apollo-utilities')
const { InMemoryCache } = require('apollo-cache-inmemory')
const gql = require('graphql-tag')
const FormData = require('form-data')
const fetch = require('node-fetch')
const wait = require('waait')

function generateFetchOptions(token, fileSize) {
  // This dance needs to happen because apollo-upload-client is 'untestable':
  // https://github.com/jaydenseric/apollo-upload-client/issues/32#issuecomment-327694315

  let variables
  let size
  let query

  if (fileSize) {
    variables = {
      file: null,
      fileSize,
    }
    query =
      'mutation uploadFile($file: Upload!, $fileSize: Int) { upload(file: $file, fileSize: $fileSize) { url, __typename }}'
    size = fileSize
  } else {
    variables = {
      file: null,
    }
    query =
      'mutation uploadFile($file: Upload!) { upload(file: $file) { url, __typename }}'
    size = 1000000
  }

  const body = new FormData()
  body.append(
    'operations',
    JSON.stringify({
      operationName: 'uploadFile',
      variables,
      query,
    }),
  )

  body.append('map', JSON.stringify({ 1: ['variables.file'] }))
  body.append('1', 'a'.repeat(size), { filename: 'a.txt' })

  const options = {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return options
}
describe('GraphQL subscriptions', () => {
  let token
  let user
  let server
  let apolloClient
  let wsLink

  beforeAll(async () => {
    server = await startServer()
  })
  beforeEach(async () => {
    await cleanDB()
    user = await new User(fixtures.adminUser).save()
    token = authentication.token.create(user)
    wsLink = new WebSocketLink({
      uri: `ws://localhost:4000/subscriptions`,
      options: {
        connectionParams: {
          authToken: token,
        },
      },
      reconnect: false,
      webSocketImpl: WebSocket,
    })
    const httpLink = createHttpLink({ fetch })
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
    apolloClient = new ApolloClient(config)
  })

  afterEach(async () => {
    await wsLink.subscriptionClient.client.close()
  })

  afterAll(done => server.close(done))

  it('reports progress when fileSize is given', async () => {
    let done
    let progress = 0

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
          next: async res => {
            expect(res.data.uploadProgress).toBeGreaterThanOrEqual(progress)
            progress = res.data.uploadProgress
            expect(progress).toBeGreaterThan(-1)
            expect(progress).toBeLessThanOrEqual(100)
            // sometimes the last notification is sent slightly before
            // fetch completes, resulting in an unresolved promise, so
            // we just wait a tiny bit.
            await wait(100)
            if (done) resolve('done')
          },
          error: reject,
        })
    })

    await fetch(
      `http://localhost:4000/graphql`,
      generateFetchOptions(token, 1000000),
    )
    done = true
    expect(await subscriptionPromise).toBe('done')
  })

  it('reports progress when fileSize is not given', async () => {
    let done
    let progress = 0

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
          next: async res => {
            expect(res.data.uploadProgress).toBeGreaterThanOrEqual(progress)
            progress = res.data.uploadProgress
            expect(progress).toBeGreaterThan(-1)
            expect(progress).toBeLessThanOrEqual(1000000)
            // sometimes the last notification is sent slightly before
            // fetch completes, resulting in an unresolved promise, so
            // we just wait a tiny bit.
            await wait(100)
            if (done) resolve('done')
          },
          error: reject,
        })
    })

    await fetch(`http://localhost:4000/graphql`, generateFetchOptions(token))
    done = true
    expect(await subscriptionPromise).toBe('done')
  })
})
