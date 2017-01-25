const expect = require.requireActual('chai').expect

const defaults = require.requireActual('lodash/defaults')
const allactions = require.requireActual('../../src/actions')
const auth = require.requireActual('./auth')

const empty = {}
const mockDispatch = () => {}
const mockGetState = () => {
  return {
    currentUser: {
      token: auth.token()
    }
  }
}

const get = arg => typeof arg === 'function' ? arg() : arg

const describeAction = actions => (key, opts, testFunctionality) => {
  if (typeof opts === 'function') {
    testFunctionality = opts
    opts = {}
  }

  defaults(opts, {
    firstarg: empty,
    secondarg: empty,
    types: {},
    properties: {},
    user: require.requireActual('pubsweet/test/fixtures').adminUser
  })

  describe(key, () => {
    // functional tests - no server required
    it('is exported from the file', () => {
      expect(actions).to.have.property(key)
    })

    it('is exported in the all actions object', () => {
      expect(allactions).to.have.property(key)
    })

    const action = actions[key]

    it('returns a fetcher function', () => {
      const returned = action(mockDispatch, mockGetState)
      expect(returned).to.be.a('function')
    })

    it('returns a promise from the fetcher function', () => {
      const fetcher = action(get(opts.firstarg), get(opts.secondarg))
      const returned = fetcher(mockDispatch, mockGetState)
      expect(returned).to.be.a('promise')
    })

    it('dispatches a typed fragment', () => {
      const fetcher = action(get(opts.firstarg), get(opts.secondarg))
      let frag
      fetcher(fragment => { frag = fragment }, mockGetState)
      expect(frag).to.exist
      expect(frag).to.include.keys('type')
    })

    // real interaction with server
    if (opts.types.request) {
      const properties = opts.properties.request
      const propmsg = properties
        ? `with [ ${properties.join(', ')}] `
        : ''
      it(`dispatches ${key}Request ${propmsg}immediately`, () => {
        let dispatched

        const dispatch = typedmsg => {
          if (!dispatched) dispatched = typedmsg
        }

        action(get(opts.firstarg), get(opts.secondarg))(
          dispatch, mockGetState
        )

        expect(dispatched).to.be.ok
        expect(dispatched.type).to.equal(opts.types.request)

        if (properties) {
          expect(Object.keys(dispatched)).to.include.members(properties)
        }
      })
    }

    if (opts.types.success) {
      const properties = opts.properties.success
      const propmsg = properties
        ? `with [${properties.join(', ')}] `
        : ''

      it(`dispatches ${key}Success ${propmsg}on successful response`, () => {
        return auth.login(get(opts.user)).then(
          user => action(get(opts.firstarg), get(opts.secondarg))(
            typedmsg => new Promise(
              (resolve, reject) => resolve(typedmsg)
            ),
            mockGetState
          )
        ).then(
          dispatched => {
            expect(dispatched).to.be.ok
            expect(dispatched.type).to.equal(opts.types.success)
            if (properties) {
              expect(Object.keys(dispatched)).to.include.members(properties)
            }
          }
        ).then(auth.logout)
      })
    }

    if (opts.types.failure) {
      const properties = opts.properties.failure
      const propmsg = properties
        ? `with [${properties.join(', ')}] `
        : ''

      it(`dispatches ${key}Failure ${propmsg}on failed response`, () => {
        return action(get(opts.firstarg), get(opts.secondarg))(
          typedmsg => new Promise(
            (resolve, reject) => resolve(typedmsg)
          ),
          mockGetState
        ).then(
          dispatched => {
            expect(dispatched).to.be.ok
            expect(dispatched.type).to.equal(opts.types.failure)
            console.log('DISPATCHED:', dispatched)
            if (properties) {
              expect(Object.keys(dispatched)).to.include.members(properties)
            }
          }
        )
      })
    }
  })
}

module.exports = describeAction
