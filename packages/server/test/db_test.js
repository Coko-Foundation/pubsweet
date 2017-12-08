describe('db configuration', () => {
  it('overrides default adapter with config', async () => {
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'test'
    const config = require('config')
    config['pubsweet-server'].adapter = 'leveldb'
    config['pubsweet-server'].dbPath = __dirname
    const createDb = require('../src/db')
    const db = createDb()
    expect(db.adapter).toBe('leveldb')
    await db.destroy()
    process.env.NODE_ENV = originalNodeEnv
  })
})
