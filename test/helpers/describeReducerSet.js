const allreducers = require.requireActual('../../src/reducers')
const expect = require.requireActual('chai').expect

const describeReducerSet = (key, reducers, cb) => describe(key, () => {
  it('is exported from the file', () => {
    expect(reducers).to.have.property(key)
  })

  it('is exported in the all reducers object', () => {
    expect(allreducers).to.have.property(key)
  })

  it('is a function', () => {
    expect(reducers[key]).to.be.a('function')
  })

  if (cb) cb()
})

module.exports = describeReducerSet
