const STATUS = require('http-status-codes')
const EventSource = require('eventsource')

const User = require('../src/models/User')

const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const api = require('./helpers/api')

const port = 30646

describe('API SSE disabled', () => {
  let es
  let server

  beforeEach(async () => {
    await cleanDB()
    await new User(fixtures.adminUser).save()
    await new Promise((resolve, reject) => {
      server = api.app.listen(port, err => (err ? reject(err) : resolve()))
    })
  })

  afterEach(() => {
    if (es) es.close()
    if (server) server.close()
  })

  it('should not send an event if not configured', async () => {
    const token = await api.users.authenticate.post(fixtures.adminUser)
    es = new EventSource(
      `http://localhost:${port}/updates?access_token=${encodeURIComponent(
        token,
      )}`,
    )

    const eventPromise = new Promise((resolve, reject) => {
      es.addEventListener('message', resolve)
      es.addEventListener('error', reject)
    })

    await expect(eventPromise).rejects.toEqual({
      message: 'Not Found',
      type: 'error',
      status: STATUS.NOT_FOUND,
    })
  })
})
