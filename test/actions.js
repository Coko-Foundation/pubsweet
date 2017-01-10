import 'babel-polyfill'

require('./helpers/env')

describe('ACTIONS', () => {
  require('require-dir')('./actions')
})
