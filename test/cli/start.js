jest.mock('webpack', () => {
  const compiler = {
    run: cb => cb(null, {})
  }
  return () => compiler
})
jest.mock(require('path').join(process.cwd(), 'webpack', `webpack.${require('config')['NODE_ENV']}.config.js`), () => {}, {virtual: true})
jest.mock(require('path').join(process.cwd(), 'config', 'components.json'), () => [], {virtual: true})
jest.mock('pubsweet-server', () => jest.fn(x => x))
jest.mock('forever-monitor', () => ({
  start: jest.fn(() => ({ on: jest.fn() }))
}))

// const foreverSpy = require('forever-monitor').start
const { getMockArgv } = require('../helpers/')
const Promise = require('bluebird')
const config = require('config')
config['pubsweet-server'] = { dbPath: __dirname, adapter: 'leveldb' }
const runStart = require('../../cli/start')
const start = require('../../src/start/')

describe('start', () => {
  let server

  afterAll(async () => {
    const closeServer = Promise.promisify(server.close, { context: server })
    await closeServer()
  })

  it('throws an error if no database found', async () => {
    await expect(runStart(getMockArgv(''))).rejects.toHaveProperty('message', `Create database with "pubsweet setupdb" before starting app`)
  })

  it('starts the server', async () => {
    server = await start()
    expect(server.listening).toBe(true)
  })
})
