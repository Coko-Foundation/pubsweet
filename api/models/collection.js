'use strict'
const Model = require('./model')

class Collection extends Model {
  constructor (properties) {
    super(properties)
    this.type = 'collection'
    this.title = properties.title
  }

  getFragments () {
    console.log('fragments', fragments)
    var fragments = this.fragments.map(function (id) {
      return db.get(id)
    })
    console.log('promises', fragments)
    return Promise.all(fragments)
  }

  static get () {
  // Idempotently create indexes in datastore
    return db.createIndex({
      index: {
        fields: ['type']
      }
    }).then(function (result) {
      return db.find({selector: {type: 'collection'}}).then(function (results) {
        console.log(results.docs[0])
        return new this(results.docs[0])
      }.bind(this))
    }.bind(this)).catch(function (err) {
      console.error(err)
    })
  }
}

Collection.type = 'collection'

module.exports = Collection
