const manager = require('../../src/graphql/pubsub')

describe('pubsub manager', () => {
  afterEach(() => manager.destroy())

  it('can call destroy before connect', () =>
    expect(manager.destroy()).resolves.toBeUndefined())

  it('returns singleton instance', () => {
    const instance1 = manager.connect()
    const instance2 = manager.connect()
    expect(instance1).toBe(instance2)
  })

  it('waits for client to drain before closing', async () => {
    const pubsub = manager.connect()
    const cb = jest.fn()
    pubsub.subscribe('test_channel', cb)
    pubsub.publish('test_channel', { test: 'content' })
    const destroyPromise = manager.destroy({ drain: true })

    expect(cb).not.toHaveBeenCalled()
    await destroyPromise
    expect(cb).toHaveBeenCalledWith({ test: 'content' })
  })
})
