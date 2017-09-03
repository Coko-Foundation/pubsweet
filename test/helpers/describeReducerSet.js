const allreducers = require.requireActual('../../src/reducers').default
const expect = require.requireActual('chai').expect

const describeReducerSet = (key, reducers) => {
  describe(key, () => {
    it('is exported from the file', () => {
      expect(reducers).to.have.property('default')
    })

    it('is exported in the all reducers object', () => {
      expect(allreducers).to.have.property(key)
    })

    it('is a function', () => {
      expect(reducers.default).to.be.a('function')
    })
  })
}

module.exports = describeReducerSet
