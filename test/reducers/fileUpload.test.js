const expect = require.requireActual('chai').expect
const allReducers = require.requireActual('../../src/reducers').default
const reducer = require.requireActual('../../src/reducers/fileUpload').default
const describeReducer = require.requireActual('../helpers/describeReducer')(reducer)

const T = require('../../src/actions/types')

describe('fileUpload reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.fileUpload).to.equal(reducer)
  })

  describeReducer('fileUpload success', {
    action: {
      type: T.FILE_UPLOAD_SUCCESS,
      file: 'somefile'
    },
    output: {
      isFetching: false,
      file: 'somefile'
    }
  })

  describeReducer('fileUpload request', {
    action: {
      type: T.FILE_UPLOAD_REQUEST
    },
    output: { isFetching: true }
  })
})
