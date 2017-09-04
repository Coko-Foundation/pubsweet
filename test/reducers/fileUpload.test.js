const expect = require('chai').expect
const allReducers = require('../../src/reducers').default
const reducer = require('../../src/reducers/fileUpload').default

const T = require('../../src/actions/types')

describe('fileUpload reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.fileUpload).to.equal(reducer)
  })

  it('fileUpload success', () => {
    const actual = reducer(undefined, {
      type: T.FILE_UPLOAD_SUCCESS,
      file: 'somefile'
    })
    expect(actual).to.eql({
      isFetching: false,
      file: 'somefile'
    })
  })

  it('fileUpload request', () => {
    const actual = reducer(undefined, {
      type: T.FILE_UPLOAD_REQUEST
    })
    expect(actual).to.eql({ isFetching: true })
  })
})
