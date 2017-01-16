const expect = require('chai').expect
const defaults = require('lodash/defaults')

const empty = {}
const mockDispatch = () => {}
const mockGetState = () => { return { currentUser: { token: '' } } }

module.exports = actions => (key, opts, testFunctionality) => {
  if (typeof opts === 'function') {
    testFunctionality = opts
    opts = {}
  }

  defaults(opts, {
    firstarg: empty,
    secondarg: empty
  })

  describe(key, () => {
    it('is exported', () => {
      expect(actions).to.have.property(key)
    })

    const action = actions[key]

    it('returns a fetcher function', () => {
      const returned = action(empty, empty)
      expect(returned).to.be.a('function')
    })

    it('fetcher function returns a promise', () => {
      const fetcher = action(opts.firstarg, opts.secondarg)
      const returned = fetcher(mockDispatch, mockGetState)
      expect(returned).to.be.a('promise')
    })

    it('dispatches a typed fragment', () => {
      const fetcher = action(opts.firstarg, opts.secondarg)
      let frag
      fetcher(fragment => { frag = fragment }, mockGetState)
      expect(frag).to.exist
      expect(frag).to.include.keys('type')
    })

    testFunctionality(action)
  })
}
