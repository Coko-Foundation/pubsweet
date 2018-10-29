const { getPubsub, destroy } = require('../../src/graphql/pubsub')

describe('pubsub manager', () => {
  afterEach(() => destroy())

  it('can call destroy before connect', () =>
    expect(destroy()).resolves.toBeUndefined())

  it('waits for client to drain before closing', async () => {
    const pubsub = await getPubsub()
    const cb = jest.fn()
    pubsub.subscribe('test_channel', cb)
    pubsub.publish('test_channel', { test: 'content' })
    const destroyPromise = destroy({ drain: true })

    expect(cb).not.toHaveBeenCalled()
    await destroyPromise
    expect(cb).toHaveBeenCalledWith({ test: 'content' })
  })
})
