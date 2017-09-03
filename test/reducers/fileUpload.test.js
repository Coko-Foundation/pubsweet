const reducers = require.requireActual('../../src/reducers/fileUpload')
const describeReducerSet = require.requireActual('../helpers/describeReducerSet')
const describeReducer = require.requireActual('../helpers/describeReducer')(reducers.default)

const T = require('../../src/actions/types')

describe('fileUpload reducers', () => {
  describeReducerSet('fileUpload', reducers)

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
