const mockLocalStorage = require('./helpers/localStorage')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
process.env.NODE_ENV = 'production'
process.env.SILENT_NPM = 'true'
global.PUBSWEET_COMPONENTS = []

const collections = require('./actions/collections')
const fragments = require('./actions/fragments')
const currentUser = require('./actions/currentUser')
const fileUpload = require('./actions/fileUpload')
const teams = require('./actions/teams')
const users = require('./actions/users')

describe('ACTIONS', () => {
  beforeAll(() => mockLocalStorage())

  describe('collections', () => collections())
  describe('fragments', () => fragments())
  describe('current user', () => currentUser())
  describe('fileUpload', () => fileUpload())
  describe('teams', () => teams())
  describe('users', () => users())
})
