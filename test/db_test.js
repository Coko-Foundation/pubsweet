describe('db configuration', () => {
  it('overrides default adapter with config', async () => {
    const config = require('config')
    config['pubsweet-server'].adapter = 'leveldb'
    config['pubsweet-server'].dbPath = __dirname
    config['NODE_ENV'] = 'test'
    const createDb = require('../src/db')
    const db = createDb()
    expect(db.adapter).toBe('leveldb')
    await db.destroy()
  })
})
