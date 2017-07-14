global.SSE = true

const STATUS = require('http-status-codes')
const EventSource = require('eventsource')

const User = require('../src/models/User')

const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

describe('API SSE enabled', () => {
  let es
  let server

  beforeEach(() => {
    return cleanDB().then(
      () => { return new User(fixtures.adminUser).save() }
    )
  })

  afterEach(() => {
    if (es) es.close()
    if (server) server.close()
  })

  it('should send an event if configured', (done) => {
    // create a collection

    let api = require('./helpers/api')

    let test = async () => {
      let token = await api.users.authenticate.post(fixtures.adminUser)
      es = new EventSource('http://localhost:3000/updates?access_token=' + encodeURIComponent(token))

      let mockMessage = jest.fn()

      es.addEventListener('open', e => {
        console.log('HELLO', e)
      })

      es.addEventListener('message', event => {
        mockMessage()
        done()
      })

      const collection = await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      expect(mockMessage).toHaveBeenCalled()
      expect(collection.type).toEqual(fixtures.collection.type)
    }

    server = api.api.listen(3000, () => {
      test()
      console.log('listening on 3000')
    })
  })
})

global.SSE = false
