const sse = require('../lib/SSE')

function mockReqAndRes() {
  const req = jest.fn()
  req.socket = {
    setTimeout: jest.fn(),
    setKeepAlive: jest.fn(),
    setNoDelay: jest.fn(),
  }

  const res = jest.fn()
  res.statusCode = jest.fn()
  res.set = jest.fn()
  res.write = jest.fn()
  return { res, req }
}

describe('SSE pulses', () => {
  it('should not pulse if nobody is listening ', async () => {
    expect(sse.pulseInterval).toBe(undefined)
  })

  it('should pulse if someone connects', async () => {
    const { res, req } = mockReqAndRes()
    let closeFn
    req.on = (event, fn) => {
      closeFn = fn
    }
    sse.connect(
      req,
      res,
    )
    expect(sse.listenerCount('data')).toBe(1)
    expect(sse.pulseInterval).not.toBe(undefined)
    closeFn()
  })

  it('should stop pulsing if last listener disconnects', async () => {
    const { res, req } = mockReqAndRes()
    let closeFn
    req.on = (event, fn) => {
      closeFn = fn
    }
    sse.connect(
      req,
      res,
    )
    expect(sse.listenerCount('data')).toBe(1)
    closeFn()
    expect(sse.listenerCount('data')).toBe(0)
    expect(sse.pulseInterval).toBe(undefined)
  })
})
