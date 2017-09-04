const expect = require.requireActual('chai').expect
const allReducers = require.requireActual('../../src/reducers').default
const reducer = require('../../src/reducers/error').default

describe('error reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.error).to.equal(reducer)
  })

  describe('reducer error handler', () => {
    it(
      'doesn\'t do anything if there\'s no error',
      () => {
        expect(reducer(null, { error: null })).to.equal.null
      }
    )

    it(
      'returns the error message if there\'s an error',
      () => {
        const error = new Error('this is a fake error')
        const action = { error }
        expect(reducer(null, action)).to.equal(error.message)
      }
    )
  })
})
