const defaults = require('lodash/defaults')
const allactions = require('../../src/actions').default
const api = require('../../src/helpers/api')

const empty = {}
const mockDispatch = () => {}
const mockGetState = () => {
  return {
    currentUser: {}
  }
}

function mockApi (succeed = true) {
  Object.keys(api).forEach(method => {
    jest.spyOn(api, method).mockImplementation(() => succeed ? Promise.resolve({}) : Promise.reject({}))
  })
}

function unMockApi () {
  Object.keys(api).forEach(method => {
    api[method].mockRestore()
  })
}

// custom Jest matcher
expect.extend({
  toHaveProperties (object, expectedKeys) {
    const actualKeys = Object.keys(object)
    const pass = expectedKeys.every(key => actualKeys.includes(key))
    return {
      message: `Expected object ${pass ? 'not to' : 'to'} have properties: ${expectedKeys.join(', ')}`,
      pass
    }
  }
})

const describeAction = actions => (key, opts, cb) => {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  defaults(opts, {
    firstarg: empty,
    secondarg: empty,
    types: {},
    properties: {}
  })

  describe(key, () => {
    const data = {}
    let action

    if (cb) afterAll(() => cb(action, data))

    beforeEach(mockApi)

    afterEach(unMockApi)

    // functional tests - no server required
    it('is exported from the file', () => {
      expect(actions).toHaveProperty(key)
    })

    it('is exported in the all actions object', () => {
      expect(allactions).toHaveProperty(key)
    })

    action = actions[key]

    it('returns a fetcher function', () => {
      const returned = action(mockDispatch, mockGetState)
      expect(typeof returned).toBe('function')
    })

    it('returns a promise from the fetcher function', () => {
      const fetcher = action(opts.firstarg, opts.secondarg)
      const returned = fetcher(mockDispatch, mockGetState)
      expect(typeof returned.then).toBe('function')
    })

    it('dispatches a typed fragment', () => {
      const fetcher = action(opts.firstarg, opts.secondarg)
      let frag
      fetcher(fragment => { frag = fragment }, mockGetState)
      expect(frag).toBeDefined()
      expect(frag).toHaveProperty('type')
    })

    // real interaction with server
    if (opts.types.request) {
      const properties = opts.properties.request
      const propmsg = properties
        ? `with [${properties.join(', ')}] `
        : ''
      it(`dispatches ${key}Request ${propmsg}immediately`, () => {
        let dispatched

        const dispatch = typedmsg => {
          if (!dispatched) dispatched = typedmsg
        }

        let fetcher = action(opts.firstarg, opts.secondarg)
        fetcher(dispatch, mockGetState)

        expect(dispatched).toBeTruthy()
        expect(
          dispatched.type
        ).toBe(
          opts.types.request,
          `Received dispatched object with wrong type: \n${JSON.stringify(dispatched, null, 2)}`
        )
        if (properties) {
          expect(dispatched).toHaveProperties(properties)
        }

        data[opts.types.request] = dispatched
      })
    }

    if (opts.types.success) {
      const properties = opts.properties.success
      const propmsg = properties
        ? `with [${properties.join(', ')}] `
        : ''

      it(`dispatches ${key}Success ${propmsg}on successful response`, async () => {
        let fetcher = action(opts.firstarg, opts.secondarg)
        const dispatched = await fetcher(
          typedmsg => Promise.resolve(typedmsg),
          mockGetState
        )

        expect(dispatched).toBeTruthy()
        expect(dispatched.type).toBe(
          opts.types.success,
          `Received dispatched object with wrong type: \n${JSON.stringify(dispatched, null, 2)}`
        )
        if (properties) {
          expect(dispatched).toHaveProperties(properties)
        }
        data[opts.types.success] = dispatched
      })
    }

    if (opts.types.failure) {
      const properties = opts.properties.failure
      const propmsg = properties
        ? `with [${properties.join(', ')}] `
        : ''

      it(`dispatches ${key}Failure ${propmsg}on failed response`, async () => {
        // make API reject every request
        mockApi(false)

        let fetcher = action(opts.firstarg, opts.secondarg)
        const dispatched = await fetcher(
          typedmsg => Promise.resolve(typedmsg),
          mockGetState
        )

        expect(dispatched).toBeTruthy()
        expect(dispatched.type).toBe(
          opts.types.failure,
          `Received dispatched object with wrong type: \n${JSON.stringify(dispatched, null, 2)}`
        )
        if (properties) {
          expect(dispatched).toHaveProperties(properties)
        }
        data[opts.types.failure] = dispatched
      })
    }
  })
}

module.exports = describeAction
