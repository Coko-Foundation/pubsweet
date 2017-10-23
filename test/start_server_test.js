const start = require('../src/')

describe('Function exported by src/index.js', () => {
  it('starts the server and returns it with express app attached', async () => {
    const server = await start()
    expect(server.listening).toBe(true)
    expect(server).toHaveProperty('expressApp')
    return server.close()
  })

  it('returns the server if it is already running', async () => {
    const server = await start()
    server.originalServer = true
    const secondAccess = await start()
    expect(secondAccess).toHaveProperty('originalServer')
    return server.close()
  })

})
