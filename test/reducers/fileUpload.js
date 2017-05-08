const reducers = require.requireActual('../../src/reducers/fileUpload')
const describeReducerSet = require.requireActual('../helpers/describeReducerSet')

const T = require('../../src/actions/types')

module.exports = app => describeReducerSet('fileUpload', reducers, () => {
  const describeReducer = require.requireActual(
    '../helpers/describeReducer'
  )(reducers.default)

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