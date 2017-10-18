global.PUBSWEET_COMPONENTS = []

const { hydrate } = require('../../src/actions').default

describe('actions index', () => {
  describe('hydrate', () => {
    it('dispatches two actions', async () => {
      const mockDispatch = jest.fn()
      await hydrate()(mockDispatch)

      expect(mockDispatch.mock.calls).toHaveLength(2)
    })
  })
})
