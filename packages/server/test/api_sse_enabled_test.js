const STATUS = require('http-status-codes')
const EventSource = require('eventsource')
const config = require('config')

// override config for test
config['pubsweet-server'].sse = true

const { model: User } = require('@pubsweet/model-user')

const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const api = require('./helpers/api')

const port = 30645

describe('API SSE enabled', () => {
  let es
  let adminEs
  let server

  beforeEach(async () => {
    await cleanDB()
    await new User(fixtures.adminUser).save()
    await new User(fixtures.user).save()

    await new Promise((resolve, reject) => {
      server = api.app.listen(port, err => (err ? reject(err) : resolve()))
    })
  })

  afterEach(() => {
    if (es) es.close()
    if (adminEs) adminEs.close()
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

  it('supports not sending an event', async () => {
    const adminToken = await api.users.authenticate.post(fixtures.adminUser)
    const token = await api.users.authenticate.post(fixtures.user)

    es = new EventSource(
      `http://localhost:${port}/updates?access_token=${encodeURIComponent(
        token,
      )}`,
    )

    // wrap user's event listener in promise
    const eventPromise = new Promise(resolve =>
      es.addEventListener('message', resolve),
    )

    // perform action (we'll block the SSE for this one)
    await api.fragments
      .post({ fragment: fixtures.fragment, token: adminToken })
      .expect(STATUS.CREATED)

    // perform action (let this one through filtered)
    await api.collections
      .create(fixtures.collection, adminToken)
      .expect(STATUS.CREATED)

    // await user's filtered event
    const event = await eventPromise
    const eventData = JSON.parse(event.data)

    expect(eventData).toEqual(
      expect.objectContaining({
        action: 'collection:create',
        data: {
          collection: {
            id: expect.any(String),
            title: fixtures.collection.title,
          },
        },
      }),
    )
  })

  it('supports property-filtering', async () => {
    const adminToken = await api.users.authenticate.post(fixtures.adminUser)
    const token = await api.users.authenticate.post(fixtures.user)

    adminEs = new EventSource(
      `http://localhost:${port}/updates?access_token=${encodeURIComponent(
        adminToken,
      )}`,
    )

    es = new EventSource(
      `http://localhost:${port}/updates?access_token=${encodeURIComponent(
        token,
      )}`,
    )

    const adminEventPromise = new Promise(resolve =>
      adminEs.addEventListener('message', resolve),
    )

    const eventPromise = new Promise(resolve =>
      es.addEventListener('message', resolve),
    )

    // perform action
    await api.collections
      .create(fixtures.collection, adminToken)
      .expect(STATUS.CREATED)

    // await admins unfiltered event
    const adminEvent = await adminEventPromise
    const adminEventData = JSON.parse(adminEvent.data)

    expect(Object.keys(adminEventData.data.collection)).toEqual(
      expect.arrayContaining(['id', 'created', 'title', 'owners']),
    )

    // await user's filtered event
    const event = await eventPromise
    const eventData = JSON.parse(event.data)

    expect(eventData).toEqual(
      expect.objectContaining({
        action: 'collection:create',
        data: {
          collection: {
            id: expect.any(String),
            title: fixtures.collection.title,
          },
        },
      }),
    )
  })
})
