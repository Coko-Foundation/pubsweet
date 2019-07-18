const WebSocket = require('ws')

Object.assign(global, {
  WebSocket,
})

// const { model: User } = require('@pubsweet/model-user')
// const { fixtures } = require('@pubsweet/model-user/test')
// const cleanDB = require('pubsweet-server/test/helpers/db_cleaner')
// const api = require('pubsweet-server/test/helpers/api')
const authentication = require('pubsweet-server/src/authentication')

const { startServer } = require('pubsweet-server')

const fs = require('fs')
const path = require('path')

const { SubscriptionClient } = require('subscriptions-transport-ws')
const superagent = require('superagent')

jest.setTimeout(60000)

describe('XSweet job', () => {
  let token
  // let user
  let server
  beforeEach(async () => {
    // await cleanDB()
    server = await startServer()
    // user = await new User(fixtures.user).save()
    token = authentication.token.create({ id: 1, username: 'test' })
  })

  afterAll(done => server.close(done))

  it('can process it', async done => {
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

    const client = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
      connectionParams: {
        authToken: token,
      },
    })

    // client.onConnected(() => {
    //   // console.log('HELLLO!!!')
    // })

    // client.onError(e => console.log(e))

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
            // console.log(res)
            if (res.data.docxToHTMLJob.status === 'Done') {
              const { body } = await superagent
                .post('http://localhost:4000/graphql')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                  variables: { jobId: res.data.docxToHTMLJob.id },
                  query: `query docxToHTMLJob($jobId: String!) {
                    docxToHTMLJob(jobId: $jobId) {
                      status
                      html
                    }
                  }`,
                })

              expect(body.data.docxToHTMLJob.html).toMatch(/Test/)
              resolve(true)
            }
            return true
          },
          error: reject,
        })
    })

    await subscriptionPromise

    client.unsubscribeAll()

    done()
  })
})
