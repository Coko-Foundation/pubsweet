const someHandler = async job => Promise.resolve({ thing: 'someOtherThing' })

const handleJobs = async () => {
  global.__testDbName = process.env.__TESTDBNAME
  const { connect: jobs } = require('../../src/jobs')

  const jobQueue = await jobs()

  const queueName = 'aJobQueue2'

  // Subscribe to the job queue with an async handler
  await jobQueue.subscribe(queueName, someHandler)
}

// setInterval(() => {}, 1 << 30)

handleJobs()
