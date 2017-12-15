const STATUS = require('http-status-codes')
const EventSource = require('eventsource')
const config = require('config')

// override config for test
config['pubsweet-server'].sse = true

const User = require('../src/models/User')

const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const api = require('./helpers/api')

const port = 30645

describe('API SSE enabled', () => {
  let es
  let server

  beforeEach(async () => {
    await cleanDB()
    await new User(fixtures.adminUser).save()
    await new Promise((resolve, reject) => {
      server = api.api.listen(port, err => (err ? reject(err) : resolve()))
    })
  })

  afterEach(() => {
    if (es) es.close()
    if (server) server.close()
  })

  it('should send an event if configured', async () => {
    const token = await api.users.authenticate.post(fixtures.adminUser)
    es = new EventSource(
      `http://localhost:${port}/updates?access_token=${encodeURIComponent(
        token,
      )}`,
    )

    // wrap event listener in promise
    const eventPromise = new Promise(resolve =>
      es.addEventListener('message', resolve),
    )

    // perform action
    await api.collections
      .create(fixtures.collection, token)
      .expect(STATUS.CREATED)

    // await event
    const event = await eventPromise
    const eventData = JSON.parse(event.data)
    expect(eventData).toMatchObject({
      action: 'collection:create',
      data: {
        collection: fixtures.collection,
      },
    })
  })
})
