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
  const app = require('./helpers/mockapp.json')

  describe('collections', () => collections(app))
  describe('fragments', () => fragments(app))
  describe('current user', () => currentUser(app))
  describe('fileUpload', () => fileUpload(app))
  describe('teams', () => teams(app))
  describe('users', () => users(app))
})
