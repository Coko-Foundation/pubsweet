jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
process.env.NODE_ENV = 'production'
process.env.SILENT_NPM = 'true'
global.PUBSWEET_COMPONENTS = []

const expect = require.requireActual('chai').expect

const startnewapp = require.requireActual('pubsweet/test/helpers/startnewapp')

const collectionsFragments = require('./actions/collectionsFragments')
const current_user = require('./actions/current_user')
const teams = require('./actions/teams')
const users = require('./actions/users')

describe('ACTIONS', () => {
  const app = require('./helpers/mockapp.json')

  it('needs a running app', () => { expect(app.server).to.be.ok })

  describe('collections and fragments', () => collectionsFragments(app))
  describe('current user', () => current_user(app))
  describe('teams', () => teams(app))
  describe('users', () => users(app))

  afterAll(() => process.kill(app.pid))
})
