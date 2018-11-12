process.env.NODE_CONFIG = '{"pubsweet-server":{"port":4001}}'
const { startServer } = require('../src')

describe('Function exported by src/index.js', () => {
  it('starts the server and returns it with express app attached', async done => {
    const server = await startServer()
    expect(server.listening).toBe(true)
    expect(server).toHaveProperty('app')
    server.close(done)
  })

  it('returns the server if it is already running', async done => {
    const server = await startServer()
    server.originalServer = true
    const secondAccess = await startServer()
    expect(secondAccess).toHaveProperty('originalServer')
    server.close(done)
  })
})
