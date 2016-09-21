'use strict'

const defaultLensArticle = require('lens/model/defaultLensArticle')
const Err = require('substance/util/Error')
const Fragment = require('../models/Fragment')
const filter = require('lodash/filter')

const async = require('async')

global.queue = global.queue || {}

class ChangeStore {

  constructor (properties) {
    this._changes = {}
  }

  getChanges (args, cb) {
    return this._getChanges(args.documentId).then(function (changes) {
      return changes.map(function (change) {
        return change.change
      })
    }).then(function (changes) {
      var version = changes.length
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

    global.queue[args.documentId] = global.queue[args.documentId] || async.queue(function (args, callback) {
      this._addChange(args.documentId, args.change).then(change => {
        console.log('getting version')
        return this._getVersion(args.documentId)
      }).then(version => {
        console.log('got version', version)
        args.callback(null, version)
        callback()
      })
    }.bind(this), 1)

    args.callback = cb

    global.queue[args.documentId].push(args, function (err) {
      console.log(err)
      console.log('finished processing foo')
    })
  }

  deleteChanges (documentId, cb) {
    var deletedChanges = this._deleteChanges(documentId)
    cb(null, deletedChanges.length)
  }

  getVersion (id, cb) {
    return this._getVersion(id).then(function (version) {
      cb(null, version)
    })
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
    if (documentId === 'N/A') { return Promise.resolve(0) }
    return this._getChanges(documentId).then(function (changes) {
      return changes[changes.length - 1].version
    }).catch(function (err) {
      console.log(err)
      return 0
    })
  }

  _getChanges (documentId) {
    return Fragment.findByField('subtype', 'change').then(function (changes) {
      return filter(changes, function (change) {
        return change.documentId === documentId
      })
    }).catch(function (err) {
      throw err
    })
  }

  _addChange (documentId, change) {
    var createdAt = new Date().toJSON()
    return this._getVersion(documentId).then(function (version) {
      if (version === 0) {
        console.log('VERSION 1')
        var fragment = new Fragment({change: defaultLensArticle.createChangeset()[0]})
        fragment.subtype = 'change'
        fragment._id = documentId + '-' + createdAt + '-' + 1
        fragment.version = 1
        fragment.documentId = documentId
        return fragment.save().then(function () {
          console.log('VERSION 2')
          var fragment = new Fragment({change: change})
          fragment.subtype = 'change'
          fragment.version = 2
          fragment._id = documentId + '-' + createdAt + '-' + 2
          fragment.documentId = documentId
          return fragment.save()
        })
      } else {
        fragment = new Fragment({change: change})
        fragment.subtype = 'change'
        console.log('TRYING TO ADD NEXT CHANGE')
        version = version + 1
        console.log('VERSION', version)
        fragment._id = documentId + '-' + createdAt + '-' + version
        fragment.documentId = documentId
        fragment.version = version
        return fragment.save()
      }
    })
  }
}

module.exports = ChangeStore
