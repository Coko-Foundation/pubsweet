'use strict'

const Fragment = require('../models/Fragment')
const Collection = require('../models/Collection')

class DocumentStore {
  constructor (properties) {

  }

  createDocument (props, cb) {
    var collection
    var fragment = new Fragment(props.info)
    fragment.data = props.data
    fragment.version = 1
    return Collection.get().then(function (result) {
      collection = result
      return fragment.save()
    }).then(function (result) {
      // console.log('ASDOFKOSAD', result)
      fragment.documentId = result._id
      collection.addFragment(fragment)
      return collection.save()
    }).then(function (collection) {
      return cb(null, fragment)
    }).catch(function (err) {
      console.log(err)
    })
  }

  getDocument (documentId, cb) {
    Fragment.find(documentId).then(function (fragment) {
      var thing = {
        schemaName: fragment.data.schema.name,
        documentId: fragment._id
      }
      return cb(null, thing)
    }).catch(function (err) {
      console.log(err)
      return cb(404)
    })
  }

  updateDocument (documentId, newProps, cb) {
    Fragment.find(documentId).then(function (fragment) {
      return fragment.updateProperties(newProps)
    }).then(function (fragment) {
      return fragment.save()
    }).then(function (fragment) {
      return cb(null, fragment)
    }).catch(function (err) {
      console.log(err)
      return cb(404)
    })
  }

  documentExists (documentId, cb) {
    Fragment.find(documentId).then(function (fragment) {
      cb(null, true)
    }).catch(function (err) {
      console.log(err)
      cb(null, false)
    })
  }
}

module.exports = DocumentStore
