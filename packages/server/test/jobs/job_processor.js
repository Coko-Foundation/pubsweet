const someHandler = async job => Promise.resolve({ thing: 'someOtherThing' })

const handleJobs = async () => {
  global.__testDbName = process.env.__TESTDBNAME
  const { connectToJobQueue } = require('../../src/jobs')

  const jobQueue = await connectToJobQueue()

  const queueName = 'aJobQueue2'

  // Subscribe to the job queue with an async handler
  await jobQueue.subscribe(queueName, someHandler)
}

handleJobs()
