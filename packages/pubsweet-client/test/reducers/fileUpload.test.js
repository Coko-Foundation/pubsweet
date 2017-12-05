const allReducers = require('../../src/reducers').default
const reducer = require('../../src/reducers/fileUpload').default

const T = require('../../src/actions/types')

describe('fileUpload reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.fileUpload).toBe(reducer)
  })

  it('fileUpload success', () => {
    const actual = reducer(undefined, {
      type: T.FILE_UPLOAD_SUCCESS,
      file: 'somefile',
    })
    expect(actual).toEqual({
      isFetching: false,
      file: 'somefile',
    })
  })

  it('fileUpload request', () => {
    const actual = reducer(undefined, {
      type: T.FILE_UPLOAD_REQUEST,
    })
    expect(actual).toEqual({ isFetching: true })
  })

  it('returns same state for unrecognised action', () => {
    const state = {}
    const actual = reducer(state, {
      type: 'something else',
    })
    expect(actual).toBe(state)
  })
})
