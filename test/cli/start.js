jest.mock('webpack', () => {
  const compiler = {
    run: cb => cb(null, {})
  }
  return () => compiler
})
jest.mock(require('path').join(process.cwd(), 'webpack', `webpack.${process.env.NODE_ENV}.config.js`), () => {}, {virtual: true})
jest.mock(require('path').join(process.cwd(), 'config', 'components.json'), () => [], {virtual: true})
jest.mock('pubsweet-server', () => jest.fn(x => x))

// const compilerSpy = require('webpack').run

const start = require('../../src/start/')

describe('start', () => {
  it('starts the server', async () => {
    const server = await start()
    expect(server.listening).toBe(true)
  })
})
