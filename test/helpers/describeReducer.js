const expect = require.requireActual('chai').expect

const describeReducer = reducerset => (name, opts) => {
  describe(name, () => {
    it('returns the expected state', () => {
      const output = reducerset(opts.state, opts.action)
      console.log('OUTPUT', JSON.stringify(output, null, 2))
      expect(output).to.eql(opts.output)
    })
  })
}

module.exports = describeReducer
