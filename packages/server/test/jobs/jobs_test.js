const jobs = require('../../src/jobs')

const someHandler = async job =>
  // console.log('HERE I AM WITH', job)
  'victory'

describe('jobs', () => {
  it('should connect', async () => {
    const jobthing = await jobs()

    await jobthing.publish('some-queue', { param1: '1' })
    // console.log(`created ${jobId}`)

    await jobthing.subscribe('some-queue', someHandler)
  })
})
