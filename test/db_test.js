process.env.ALLOW_CONFIG_MUTATIONS = true

describe.only('db configuration', () => {
  it('overrides default adapter with config', async () => {
    const config = require('config')
    config['pubsweet-server'].adapter = 'leveldb'
    config['pubsweet-server'].dbPath = __dirname
    const previousEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'test'
    const createDb = require('../src/db')
    const db = createDb()
    expect(db.adapter).toBe('leveldb')
    await db.destroy()
    process.env.NODE_ENV = previousEnv
  })
})
