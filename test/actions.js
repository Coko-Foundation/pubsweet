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

let app = {
  user: null,
  collection: null,
  server: null
}
const getapp = () => new Promise(
  (resolve, reject) => {
    if (app.server) {
      console.log('TEST APP ALREADY RUNNING')
      return resolve(app)
    } else {
      console.log('EXISTING APP', app)
      console.log('STARTING A NEW TEST APP')
      startnewapp().then(
        _app => {
          console.log('SAVING APP', _app)
          app.user = _app.user
          app.collection = _app.collection
          app.server = _app.server
          resolve(app)
        }
      ).catch(reject)
    }
  }
)

describe('ACTIONS', () => {
  beforeEach(getapp)

  it('needs a running app', () => {
    expect(app.server).to.be.ok
  })

  describe('collections and fragments', () => collectionsFragments(app))
  describe('current user', () => current_user(app))
  describe('teams', () => teams(app))
  describe('users', () => users(app))

  afterAll(() => app.server.close())
})
