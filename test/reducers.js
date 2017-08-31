jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
process.env.SILENT_NPM = 'true'
global.PUBSWEET_COMPONENTS = []

const collections = require('./reducers/collections')
const fileUpload = require('./reducers/fileUpload')
const fragments = require('./reducers/fragments')
const currentUser = require('./reducers/currentUser')
const teams = require('./reducers/teams')
const users = require('./reducers/users')
const error = require('./reducers/error')

describe('REDUCERS', () => {
  describe('collections', () => collections())
  describe('fileUpload', () => fileUpload())
  describe('fragments', () => fragments())
  describe('current user', () => currentUser())
  describe('teams', () => teams())
  describe('users', () => users())
  describe('error', () => error())
})
