const actions = require.requireActual('../../src/actions/collections')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

module.exports = app => {
  // const mockcol = () => app.collection
  //
  // const storedData = {
  //   fragment: {}
  // }

  describeAction('getCollections', {
    types: {
      request: T.GET_COLLECTIONS_REQUEST,
      success: T.GET_COLLECTIONS_SUCCESS
    },
    properties: {
      success: ['collections']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })
}
