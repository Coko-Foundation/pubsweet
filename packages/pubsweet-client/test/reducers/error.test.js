const allReducers = require('../../src/reducers').default
const reducer = require('../../src/reducers/error').default

describe('error reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.error).toBe(reducer)
  })

  describe('reducer error handler', () => {
    it("doesn't do anything if there's no error", () => {
      expect(reducer(null, { error: null })).toBeNull()
    })

    it("returns the error message if there's an error", () => {
      jest.spyOn(console, 'error').mockImplementation(jest.fn())
      const error = new Error('this is a fake error')
      const action = { error }
      expect(reducer(null, action)).toBe(error.message)
      expect(console.error.mock.calls[0][0]).toBe(error)
    })
  })
})
