const expect = require.requireActual('chai').expect

const defaults = require.requireActual('lodash/defaults')
const allactions = require.requireActual('../../src/actions').default
const auth = require.requireActual('./auth')

const empty = {}
const mockDispatch = () => {}
const mockGetState = () => {
  return {
    currentUser: {}
  }
}

const get = arg => typeof arg === 'function' ? arg() : arg

const describeAction = actions => (key, opts, cb) => {
  if (typeof opts === 'function') {
    cb = opts
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
    const data = {}
    let action

    if (cb) afterAll(() => cb(action, data))

    // functional tests - no server required
    it('is exported from the file', () => {
      expect(actions).to.have.property(key)
    })

    it('is exported in the all actions object', () => {
      expect(allactions).to.have.property(key)
    })

    action = actions[key]

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
        ? `with [${properties.join(', ')}] `
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
        expect(
          dispatched.type
        ).to.equal(
          opts.types.request,
          `Received dispatched object with wrong type: \n${JSON.stringify(dispatched, null, 2)}`
        )
        if (properties) {
          expect(Object.keys(dispatched)).to.include.members(properties)
        }

        data[opts.types.request] = dispatched
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
            expect(
              dispatched.type
            ).to.equal(
              opts.types.success,
              `Received dispatched object with wrong type: \n${JSON.stringify(dispatched, null, 2)}`
            )
            if (properties) {
              expect(Object.keys(dispatched)).to.include.members(properties)
            }
            data[opts.types.success] = dispatched
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
        return auth.logout().then(
          () => action(get(opts.firstarg), get(opts.secondarg))(
            typedmsg => new Promise(
              (resolve, reject) => resolve(typedmsg)
            ),
            mockGetState
          )
        ).then(
          dispatched => {
            expect(dispatched).to.be.ok
            expect(
              dispatched.type
            ).to.equal(
              opts.types.failure,
              `Received dispatched object with wrong type: \n${JSON.stringify(dispatched, null, 2)}`
            )
            if (properties) {
              expect(Object.keys(dispatched)).to.include.members(properties)
            }
            data[opts.types.failure] = dispatched
          }
        )
      })
    }
  })
}

module.exports = describeAction
