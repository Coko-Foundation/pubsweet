jest.mock('webpack', () => {
  const compiler = {
    run: cb => cb(null, {})
  }
  return () => compiler
})
jest.mock(require('path').resolve('webpack', `webpack.${require('config').util.getEnv('NODE_ENV')}.config.js`), () => {}, {virtual: true})
jest.mock(require('path').resolve('config', 'components.json'), () => [], {virtual: true})
jest.mock('forever-monitor', () => ({
  start: jest.fn(() => ({ on: jest.fn() }))
}))
jest.mock('require-relative', () => () => (app) => require('bluebird').resolve({ on: jest.fn(), app }))

const { getMockArgv } = require('../helpers/')
const Promise = require('bluebird')

const config = require('config')
config['pubsweet-server'] = { dbPath: __dirname, adapter: 'leveldb' }
const runStart = require('../../cli/start')
const start = require('../../src/startup/start.js')

describe('start', () => {
  let server

  afterAll(async () => {
    const closeServer = Promise.promisify(server.close, { context: server })
    await closeServer()
  })

  it('throws an error if no database found', async () => {
    await expect(runStart(getMockArgv(''))).rejects.toHaveProperty('message', `Create database with "pubsweet setupdb" before starting app`)
  })

  it('calls startServer with an express app', async () => {
    server = await start()
    expect(server.app).toHaveProperty('mountpath', '/')
  })
})
