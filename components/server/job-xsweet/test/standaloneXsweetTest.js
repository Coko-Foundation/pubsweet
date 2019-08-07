// const log = require('why-is-node-running')
const WebSocket = require('ws')

Object.assign(global, {
  WebSocket,
})

const { destroy } = require('pubsweet-server/src/graphql/pubsub')
const authentication = require('pubsweet-server/src/authentication')

const { startServer } = require('pubsweet-server')

const fs = require('fs')
const path = require('path')

const { SubscriptionClient } = require('subscriptions-transport-ws')
const superagent = require('superagent')

const wait = require('waait')

jest.setTimeout(60000)

describe('XSweet job', () => {
  let server
  let token

  beforeAll(async () => {
    server = await startServer()
    token = authentication.token.create({ id: 1, username: 'test' })
  })

  afterAll(async done => {
    await destroy()
    await server.close()
    setImmediate(() => server.emit('close'))
    await wait(500)
    done()
  })

  describe('Endpoint', () => {
    it('returns html', async () => {
      const file = fs.createReadStream(path.join(__dirname, '../src/test.docx'))
      const { text } = await superagent
        .post('http://localhost:4000/convertDocxToHTML')
        .attach('docx', file)

      expect(text).toMatch(/Testing conversion 123/)
    })
  })

  describe('GraphQL subscriptions', () => {
    // let user
    let client

    beforeAll(() => {
      client = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
        connectionParams: {
          authToken: token,
        },
      })
    })

    afterAll(() => {
      client.client.close()
    })

    it('can process it', async () => {
      const { body } = await superagent
        .post('http://localhost:4000/graphql')
        .field(
          'operations',
          JSON.stringify({
            operationName: null,
            variables: { file: null },
            query: `mutation createDocxToHTMLJob($file: Upload!) {
              createDocxToHTMLJob(file: $file) {
                status
                id
              }
            }`,
          }),
        )
        .field('map', JSON.stringify({ '0': ['variables.file'] }))
        .attach(
          '0',
          fs.readFileSync(path.join(__dirname, '../src/test.docx')),
          'test.docx',
        )
        .set('Authorization', `Bearer ${token}`)

      expect(body.data.createDocxToHTMLJob.status).toBe('Uploading file')

      const subscriptionPromise = new Promise((resolve, reject) => {
        client
          .request({
            query: `subscription docxToHTMLJob($jobId: String!) {
                docxToHTMLJob(jobId: $jobId) {
                  id
                  status
                  html
                }
              }
            `,
            variables: {
              jobId: body.data.createDocxToHTMLJob.id,
            },
          })
          .subscribe({
            next: async res => {
              if (res.data.docxToHTMLJob.status === 'Done') {
                resolve(res.data.docxToHTMLJob.html)
              }
              return true
            },
            error: reject,
          })
      })

      const result = await subscriptionPromise
      expect(result).toMatch(/Testing conversion 123/)
    })
  })
})
