const expect = require.requireActual('chai').expect

describe('error reducers', () => {
  describe('reducer error handler', () => {
    const errorhandler = require('../../src/reducers/error').default

    it(
      'doesn\'t do anything if there\'s no error',
      () => {
        expect(errorhandler(null, { error: null })).to.be.null
      }
    )

    it(
      'returns the error message if there\'s an error',
      () => {
        const error = new Error('this is a fake error')
        const action = { error }
        expect(errorhandler(null, action)).to.equal(error.message)
      }
    )
  })
})
