import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'

const allactions = require('../../src/actions').default
const api = require('../../src/helpers/api')

const mockGetState = () => ({
  currentUser: {},
})

function mockApi(succeed = true) {
  const implementation = () =>
    succeed ? Promise.resolve({}) : Promise.reject(new Error({}))
  Object.keys(api)
    .filter(method => typeof api[method] === 'function')
    .forEach(method =>
      jest.spyOn(api, method).mockImplementation(implementation),
    )
}

// custom Jest matcher
expect.extend({
  toHaveProperties(actual, expected) {
    const message = pass => (actual, expected) => () => `${matcherHint(
      '.toHaveProperties',
    )}

      Expected object ${pass ? 'not to' : 'to'} contain all keys:
      ${printExpected(expected)}
      Received:
      ${printReceived(Object.keys(actual))}`

    const actualKeys = Object.keys(actual)
    const pass =
      expected.length === actualKeys.length &&
      expected.every(key => actualKeys.includes(key))
    return {
      message: message(pass)(actual, expected),
      pass,
    }
  },
})

const describeAction = actions => (key, opts) => {
  describe(key, () => {
    const actionCreator = actions[key]

    beforeEach(mockApi)

    afterEach(() => jest.restoreAllMocks())

    it('is exported from the file', () => {
      expect(actions).toHaveProperty(key)
    })

    it('is exported in the all actions object', () => {
      expect(allactions).toHaveProperty(key)
    })

    it('returns a fetcher function', () => {
      const thunk = actionCreator(() => {}, mockGetState)
      expect(typeof thunk).toBe('function')
    })

    it('returns a promise from the fetcher function', () => {
      const thunk = actionCreator(opts.firstarg, opts.secondarg)
      const returned = thunk(() => {}, mockGetState)
      expect(typeof returned.then).toBe('function')
    })

    it('dispatches an action object with a type property', () => {
      const actions = []
      const thunk = actionCreator(opts.firstarg, opts.secondarg)
      thunk(action => actions.push(action), mockGetState)
      expect(actions).toHaveLength(1)
      expect(actions[0]).toHaveProperty('type')
    })

    if (opts.types.request) {
      const properties = opts.properties.request
      const propmsg = properties ? `with [${properties.join(', ')}] ` : ''

      it(`dispatches ${key}Request ${propmsg}immediately`, () => {
        const actions = []
        const thunk = actionCreator(opts.firstarg, opts.secondarg)
        thunk(action => actions.push(action), mockGetState)

        const firstAction = actions[0]
        expect(firstAction).toBeTruthy()
        expect(firstAction.type).toBe(opts.types.request)
        if (properties) {
          expect(firstAction).toHaveProperties(properties)
        }
      })
    }

    if (opts.types.success) {
      const properties = opts.properties.success
      const propmsg = properties ? `with [${properties.join(', ')}] ` : ''

      it(`dispatches ${key}Success ${propmsg}on successful response`, async () => {
        const actions = []
        const thunk = actionCreator(opts.firstarg, opts.secondarg)
        await thunk(action => actions.push(action), mockGetState)

        const secondAction = actions[1]
        expect(secondAction).toBeTruthy()
        expect(secondAction.type).toBe(opts.types.success)
        if (properties) {
          expect(secondAction).toHaveProperties(properties)
        }
      })
    }

    if (opts.types.failure) {
      const properties = opts.properties.failure
      const propmsg = properties ? `with [${properties.join(', ')}] ` : ''

      it(`dispatches ${key}Failure ${propmsg}on failed response`, async () => {
        // make API reject every request
        mockApi(false)

        const actions = []
        const thunk = actionCreator(opts.firstarg, opts.secondarg)
        await thunk(action => actions.push(action), mockGetState)

        const secondAction = actions[1]
        expect(secondAction).toBeTruthy()
        expect(secondAction.type).toBe(opts.types.failure)
        if (properties) {
          expect(secondAction).toHaveProperties(properties)
        }
      })
    }
  })
}

module.exports = describeAction
