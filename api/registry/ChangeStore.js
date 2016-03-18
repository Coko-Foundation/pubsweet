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
      // console.log('sdjfoiasdfj', JSON.stringify(changes, null, 2))
      var version = changes.length
      // console.log(changes, 'VERSION', version)
      var res
      if (args.sinceVersion === 0) {
        // console.log('asodkf')
        res = {
          version: version,
          changes: changes
        }
        cb(null, res)
      } else if (args.sinceVersion > 0) {
        // console.log('maojO', args.sinceVersion)

        res = {
          version: version,
          changes: changes.slice(args.sinceVersion)
        }
        cb(null, res)
      } else {
        // console.log('WHAOJO')
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
    if (global.versions[documentId]) {
      return global.versions[documentId]
    } else {
      global.versions[documentId] = 0
      return global.versions[documentId]
    }
  }

  _getChanges (documentId) {
    return Fragment.findByField('subtype', 'change').then(function (changes) {
      return filter(changes, function (change) {
        return change.documentId === documentId
      }).map(function (change) {
        return change.change
      })
    }).catch(function (err) {
      // console.log('MISTEJKA', err)
      throw err
    })
  }

  _addChange (documentId, change) {
    var createdAt = new Date().toJSON()
    if (this._getVersion(documentId) === 0) {
      console.log('VERSION 1')
      global.versions[documentId] = 1
      var fragment = new Fragment({change: defaultLensArticle.createChangeset()[0]})
      fragment.subtype = 'change'
      // console.log('THIS IS DOCUMENTID', documentId)
      fragment._id = documentId + '-' + createdAt + '-' + global.versions[documentId]
      fragment.documentId = documentId
      return fragment.save().then(function () {
        global.versions[documentId] += 1
        console.log('VERSION', global.versions[documentId])
        var fragment = new Fragment({change: change})
        fragment.subtype = 'change'
        fragment._id = documentId + '-' + createdAt + '-' + (global.versions[documentId])
        fragment.documentId = documentId
        return fragment.save()
      })
    } else {
      global.versions[documentId] += 1
      console.log('VERSION', global.versions[documentId])
      fragment = new Fragment({change: change})
      fragment.subtype = 'change'
      fragment._id = documentId + '-' + createdAt + '-' + (global.versions[documentId])
      fragment.documentId = documentId
      return fragment.save()
    }
  }
}

module.exports = ChangeStore
