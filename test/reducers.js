jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
process.env.NODE_ENV = 'production'
process.env.SILENT_NPM = 'true'
global.PUBSWEET_COMPONENTS = []

const expect = require.requireActual('chai').expect

const collections = require('./reducers/collections')
const fileUpload = require('./reducers/fileUpload')
const fragments = require('./reducers/fragments')
const current_user = require('./reducers/current_user')
const teams = require('./reducers/teams')
const users = require('./reducers/users')

describe('REDUCERS', () => {
  const app = require('./helpers/mockapp.json')

  describe('collections', () => collections(app))
  describe('fileUpload', () => fileUpload(app))
  describe('fragments', () => fragments(app))
  describe('current user', () => current_user(app))
  describe('teams', () => teams(app))
  describe('users', () => users(app))
})
