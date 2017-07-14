global.SSE = false

const STATUS = require('http-status-codes')
const EventSource = require('eventsource')

const User = require('../src/models/User')

const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

describe('API SSE disabled', () => {
  let es
  let server

  beforeEach(() => {
    return cleanDB().then(
      () => { return new User(fixtures.adminUser).save() }
    )
  })

  it('should not send event if not configured', (done) => {
    let api = require('./helpers/api')

    let mockMessage = jest.fn()
    let mockError = jest.fn()

    let test = async function () {
      let token = await api.users.authenticate.post(fixtures.adminUser)

      // create a collection
      es = new EventSource('http://localhost:3001/updates?access_token=' + encodeURIComponent(token))

      es.onerror = error => {
        console.log(error)
        mockError(error)
      }

      es.onmessage = message => {
        mockMessage(message)
      }

      return api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)
    }

    server = api.api.listen(3001, async () => {
      console.log('listening on 3001')
      let collection = await test()

      expect(collection.type).toEqual(fixtures.collection.type)
      expect(mockError).toHaveBeenCalled()
      expect(mockMessage).not.toHaveBeenCalled()
      es.close()
      server.close()
      done()
    })
  })
})
