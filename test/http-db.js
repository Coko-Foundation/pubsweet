jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000

require('./helpers/fix-stdio')
require('./helpers/debug-exit')

const workingdir = require('./helpers/working-dir')
const checkdb = require('../src/check-db')

const mockconfig = require('./helpers/mockconfig')
const runhttpdb = require('./helpers/pouchdb-server')

describe.only('http-db', () => {
  let env

  // temporarily set NODE_ENV to "production" so that checkdb runs
  beforeAll(() => {
    env = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
  })

  afterAll(() => {
    process.env.NODE_ENV = env
  })

  it('check-db rejects if no db exists', async () => {
    const dir = await workingdir()

    mockconfig(dir, {
      'pubsweet-server': { dbPath: 'http://localhost:54321/pubsweetfake' }
    })

    await expect(checkdb(dir)).rejects.toBeInstanceOf(Error)
  })

  it('check-db resolves if db exists', async () => {
    const dir = await workingdir()

    var server = await runhttpdb()

    mockconfig(dir, {
      'pubsweet-server': { dbPath: 'http://localhost:12345/pubsweettest' }
    })

    var options = {
      host: 'localhost',
      port: 12345,
      path: '/pubsweettest',
      method: 'PUT'
    }

    await require('http').request(options)

    await expect(checkdb(dir)).resolves.toBeUndefined()

    await server.close()
  })
})
