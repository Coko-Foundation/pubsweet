global.PUBSWEET_COMPONENTS = []

require('isomorphic-form-data')

global.FormData.prototype.oldAppend = global.FormData.prototype.append
global.FormData.prototype.append = function append(field, value, options) {
  // File upload testing hack
  if (typeof value === 'string') {
    value = fs.createReadStream(value)
  }
  this.oldAppend(field, value, options)
}

const fs = require('fs')
const actions = require('../../src/actions/fileUpload')
const describeAction = require('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

describe('fileUpload actions', () => {
  describeAction('fileUpload', {
    firstarg: './test/helpers/mockapp.js',
    types: {
      request: T.FILE_UPLOAD_REQUEST,
      success: T.FILE_UPLOAD_SUCCESS,
      failure: T.FILE_UPLOAD_FAILURE,
    },
    properties: {
      request: ['type', 'isFetching'],
      success: ['type', 'isFetching', 'file'],
      failure: ['type', 'isFetching', 'error'],
    },
  })
})
