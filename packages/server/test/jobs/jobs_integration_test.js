const {
  startServer,
  jobs: { connectToJobQueue },
} = require('../../src')

const someHandler = async job => {
  expect(job.data.param).toEqual('theThing')
  return Promise.resolve({ thing: 'theOtherThing' })
}

describe('integrated job queue', () => {
  let server

  beforeAll(async () => {
    server = await startServer()
  })

  // This is to verify that pg-boss has been setup with pg-boss.start()
  // in the process of starting pubsweet-server
  it('ready to connect and process jobs when server starts', async done => {
    const queueName = 'aJobQueue3'

    const jobQueue = await connectToJobQueue()

    // Add job to the queue
    await jobQueue.publish(queueName, { param: 'theThing' })

    // Subscribe to the job queue with an async handler
    await jobQueue.subscribe(queueName, someHandler)

    // Be notified on job completion with job result
    await jobQueue.onComplete(queueName, job => {
      try {
        expect(job.data.response).toEqual({ thing: 'theOtherThing' })
        jobQueue.disconnect().then(() => done())
      } catch (e) {
        done.fail(e)
      }
    })
  })

  afterAll(done => server.close(done))
})
