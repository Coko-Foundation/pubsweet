const expect = require.requireActual('chai').expect

global.FormData = require('formdata-polyfill')
require('../helpers/blob')

const actions = require.requireActual('../../src/actions/fileUpload')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

module.exports = app => {
  describeAction('fileUpload', {
    firstarg: require('path').join('.', 'fileUpload.js'),
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
    // optional: more functionality tests here
  })
}
