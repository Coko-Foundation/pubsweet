const { startServer } = require('../src')

describe('Function exported by src/index.js', () => {
  it('starts the server and returns it with express app attached', async () => {
    const server = await startServer()
    expect(server.listening).toBe(true)
    expect(server).toHaveProperty('app')
    return server.close()
  })

  it('returns the server if it is already running', async () => {
    const server = await startServer()
    server.originalServer = true
    const secondAccess = await startServer()
    expect(secondAccess).toHaveProperty('originalServer')
    return server.close()
  })
})
