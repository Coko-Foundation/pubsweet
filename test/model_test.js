const PouchDB = require('pouchdb')

const Model = require('../src/models/Model')
const User = require('../src/models/User')
const Collection = require('../src/models/Collection')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

describe('Model', function () {
  var user
  var otherUser

  beforeEach(function () {
    return dbCleaner().then(
      () => {
        user = new User(fixtures.user)
        return user.save()
      }
    ).then(
      () => {
        otherUser = new User(fixtures.updatedUser)
        return otherUser.save()
      }
    )
  })

  it('raises an error if trying to find on a destroyed database', () => {
    return global.db.destroy().then(
      () => Model.findByField('field', 'value')
    ).catch(err => {
      expect(err.name).toEqual('Error')
    }).then(() => {
      global.db = new PouchDB(global.db._db_name)
    })
  })

  it('raises an error if trying to find all on a destroyed database', () => {
    return global.db.destroy().then(
      () => User.all()
    ).catch(err => {
      expect(err.name).toEqual('Error')
    }).then(() => {
      global.db = new PouchDB(global.db._db_name)
    })
  })

  it('raises an error if trying to save on a destroyed database', () => {
    return global.db.destroy().then(
      () => user.save()
    ).catch(err => {
      expect(err.name).toEqual('Error')
    }).then(() => {
      global.db = new PouchDB(global.db._db_name)
    })
  })

  it('can set the owners of a Collection', () => {
    var collection = new Collection(fixtures.collection)
    return collection.save().then((collection) => {
      collection.setOwners([otherUser.id])
      expect(collection.owners).toEqual([otherUser.id])
      collection.setOwners([user.id, otherUser.id])
      expect(collection.owners.sort()).toEqual([user.id, otherUser.id].sort())
      collection.setOwners([user.id])
      expect(collection.owners).toEqual([user.id])

      try {
        collection.setOwners('notAnArray')
      } catch (err) {
        expect(err.name).toEqual('ValidationError')
        expect(err.message).toEqual('owners should be an array')
      }
    })
  })

  it('can validate an object', () => {
    var user = new User(fixtures.user)
    user.email = 'notanemail'

    try {
      user.save()
    } catch (err) {
      expect(err.name).toEqual('ValidationError')
      expect(err.message).toEqual('child "email" fails because ["email" must be a valid email]')
    }
  })
})
