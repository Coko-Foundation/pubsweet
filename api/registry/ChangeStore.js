'use strict'

const defaultLensArticle = require('lens/model/defaultLensArticle')
const Err = require('substance/util/Error')
const Fragment = require('../models/Fragment')
const filter = require('lodash/filter')

class ChangeStore {

  constructor (properties) {
    this._changes = {}
  }

  getChanges (args, cb) {
    return this._getChanges(args.documentId).then(function (changes) {
      console.log('sdjfoiasdfj', JSON.stringify(changes, null, 2))
      var version = changes.length
      console.log(changes, 'VERSION', version)
      var res
      if (args.sinceVersion === 0) {
        console.log('asodkf')
        res = {
          version: version,
          changes: changes
        }
        cb(null, res)
      } else if (args.sinceVersion > 0) {
        console.log('maojO', args.sinceVersion)

        res = {
          version: version,
          changes: changes.slice(args.sinceVersion)
        }
        cb(null, res)
      } else {
        console.log('WHAOJO')
        cb(new Err('ChangeStore.ReadError', {
          message: 'Illegal argument "sinceVersion":' + args.sinceVersion
        }))
      }
    }).catch(function (err) {
      console.log(err.stack)
    })
  }

  addChange (args, cb) {
    if (!args.documentId) {
      return cb(new Err('ChangeStore.CreateError', {
        message: 'No documentId provided'
      }))
    }

    if (!args.change) {
      return cb(new Err('ChangeStore.CreateError', {
        message: 'No change provided'
      }))
    }

    this._addChange(args.documentId, args.change).then(change => {
      return this._getVersion(args.documentId)
    }).then(version => {
      cb(null, version)
    })
  }

  deleteChanges (documentId, cb) {
    var deletedChanges = this._deleteChanges(documentId)
    cb(null, deletedChanges.length)
  }

  getVersion (id, cb) {
    cb(null, this._getVersion(id))
  }

  seed (changes, cb) {
    this._changes = changes
    if (cb) { cb(null) }
    return this
  }

  // Handy synchronous helpers
  // -------------------------

  _deleteChanges (documentId) {
    var changes = this._getChanges(documentId)
    delete this._changes[documentId]
    return changes
  }

  _getVersion (documentId) {
    return this._getChanges(documentId).then(function (changes) {
      return changes.length
    }).catch(function () {
      console.log('NOTHING FOUND DEFAULTING TO 0')
      return 0
    })
  }

  _getChanges (documentId) {
    return Fragment.findByField('subtype', 'change').then(function (changes) {
      return filter(changes, function (change) {
        return change.documentId === documentId
      }).map(function (change) {
        return change.change
      })
    }).catch(function (err) {
      console.log('MISTEJKA', err)
      throw err
    })
  }

  _addChange (documentId, change) {
    var version
    return this._getVersion(documentId).then(function (result) {
      console.log('VERSIONNNN', result)
      version = result
      if (version === 0) {
        version = version + 1
        var fragment = new Fragment({change: defaultLensArticle.createChangeset()[0]})
        fragment.subtype = 'change'
        console.log('THIS IS DOCUMENTID', documentId)
        fragment._id = documentId + '-' + version
        fragment.documentId = documentId
        return fragment.save()
      }
    }).then(function () {
      var fragment = new Fragment({change: change})
      fragment.subtype = 'change'
      fragment._id = documentId + '-' + (version + 1)
      fragment.documentId = documentId

      return fragment.save()
    })
  }
}

module.exports = ChangeStore
