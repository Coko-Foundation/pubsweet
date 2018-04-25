global.PUBSWEET_COMPONENTS = []

const actions = require('../../src/actions/currentUser')
const describeAction = require('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

describe('currentUser actions', () => {
  describeAction('getCurrentUser', {
    types: {
      request: T.GET_CURRENT_USER_REQUEST,
      success: T.GET_CURRENT_USER_SUCCESS,
      failure: T.GET_CURRENT_USER_FAILURE,
    },
    properties: {
      request: ['type'],
      success: ['type', 'user'],
      failure: ['type', 'error'],
    },
  })
})
