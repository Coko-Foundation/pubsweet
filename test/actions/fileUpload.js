jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
process.env.NODE_ENV = 'production'
process.env.SILENT_NPM = 'true'
global.PUBSWEET_COMPONENTS = []

const FileAPI = require('file-api')
const File = FileAPI.File
global.FormData = FileAPI.FormData

const actions = require.requireActual('../../src/actions/fileUpload')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

module.exports = app => {
  describeAction('fileUpload', {
    firstarg: new File('./fileUpload.js'),
    types: {
      request: T.FILE_UPLOAD_REQUEST,
      success: T.FILE_UPLOAD_SUCCESS,
      failure: T.FILE_UPLOAD_FAILURE
    },
    properties: {
      request: ['isFetching'],
      success: ['isFetching', 'file'],
      failure: ['isFetching', 'error']
    },
    user: app.user
  }, (action, data) => {
    if (data[T.FILE_UPLOAD_FAILURE]) {
      console.log('ERROR:', data[T.FILE_UPLOAD_FAILURE].error)
    }
    // optional: more functionality tests here
  })
}
