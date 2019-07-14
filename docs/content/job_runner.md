PubSweet comes with a built-in job-runner based on `pg-boss`: https://github.com/timgit/pg-boss.
The API exposed for jobs in `pubsweet-server` matches `pg-boss`'s API almost exactly. The only difference comes from starting and connection to a queue.

When the `pubsweet-server` starts, we will automatically call `startQueue()`, which calls `pg-boss`'s `start()`. This:

1. sets up the PostgreSQL database (e.g. adds a job table, migrates to latest `pg-boss` schema, etc.) to support job queues.
2. is a way for `pg-boss` to keep an eye on jobs, and manages storage (archival, deletion, etc.).

All other job queue users should use the exported `connectToJobQueue`:

```js static
const {
  jobs: { connectToJobQueue },
} = require('pubsweet-server')

const jobQueue = await connectToJobQueue()
```

After this, the API is exactly the same as `pg-boss`'s: https://github.com/timgit/pg-boss

Check out the associated tests for examples of processing a job 'in-line' (https://gitlab.coko.foundation/pubsweet/pubsweet/blob/jobs/packages/server/test/jobs/jobs_test.js) or in a different process (https://gitlab.coko.foundation/pubsweet/pubsweet/blob/jobs/packages/server/test/jobs/jobs_different_process_test.js).

For completeness, one short, complete example (in a server component context) would be:

```js static
const {
  jobs: { connectToJobQueue },
} = require('pubsweet-server')

const emailHandler = async job => {
  return sendEmail(job.data)
}

const jobQueue = await connectToJobQueue()
const queueName = 'email-queue'

// Add job to the queue
await jobQueue.publish(queueName, {
  subject: 'Hello!',
  to: 'some@example.com',
  content: 'Hi again!',
})

// Subscribe to the job queue with an async handler
await jobQueue.subscribe(queueName, emailHandler)

// Be notified on job completion with job result
jobQueue.onComplete(queueName, job => {
  console.log('Email sent to: ', job.request.data.email)
  console.log('Email job returned: ', job.response.data)
})
```

### Containers

While it is easy to create a docker container that processes jobs (equally easy as processing from a separate process, as shown in this test: https://gitlab.coko.foundation/pubsweet/pubsweet/blob/master/packages/server/test/jobs/jobs_different_process_test.js), it's not easy to sensibly manage these docker containers as a part of PubSweet's functionality. As such, I've decided to keep managing docker containers out of the scope of this MR:

1. it makes the MR quite complex and testing this the integration with Docker is not trivial
2. it's not clear this integration is needed, as using `docker-compose`, as we currently do, is quite powerful
3. this MR provides significant and much needed utility as it is, and should land as soon as possible

### Examples

An example of a long running process using this job queue is the XSweet conversion job. See https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/components/server/job-xsweet for details.
