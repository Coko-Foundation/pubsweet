'use strict'

const defaultLensArticle = require('lens/model/defaultLensArticle')
const Err = require('substance/util/Error')

class ChangeStore {

  constructor (properties) {
    this._changes = {}
  }

  getChanges (args, cb) {
    var changes = this._getChanges(args.documentId)
    var version = this._getVersion(args.documentId)
    var res

    if (args.sinceVersion === 0) {
      res = {
        version: version,
        changes: changes
      }
      cb(null, res)
    } else if (args.sinceVersion > 0) {
      res = {
        version: version,
        changes: changes.slice(args.sinceVersion)
      }
      cb(null, res)
    } else {
      cb(new Err('ChangeStore.ReadError', {
        message: 'Illegal argument "sinceVersion":' + args.sinceVersion
      }))
    }
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

    this._addChange(args.documentId, args.change)
    var newVersion = this._getVersion(args.documentId)
    cb(null, newVersion)
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
    var changes = this._changes[documentId]
    return changes ? changes.length : 0
  }

  _getChanges (documentId) {
    return this._changes[documentId] || defaultLensArticle.createChangeset()
  }

  _addChange (documentId, change) {
    debugger
    if (!this._changes[documentId]) {
      this._changes[documentId] = defaultLensArticle.createChangeset()
    }
    this._changes[documentId].push(change)
  }
}

module.exports = ChangeStore
