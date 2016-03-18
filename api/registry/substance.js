'use strict'
const express = require('express')
const substance = express.Router()

const defaultLensArticle = require('lens/model/defaultLensArticle')

const ChangeStore = require('./ChangeStore')
const DocumentStore = require('./DocumentStore')
const DocumentEngine = require('substance/collab/DocumentEngine')

const CollabServer = require('substance/collab/CollabServer')
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 8080 })

var documentStore = new DocumentStore()
var changeStore = new ChangeStore()

const Fragment = require('../models/Fragment')

var documentEngine = new DocumentEngine({
  documentStore: documentStore,
  changeStore: changeStore,
  schemas: {
    'lens-article': {
      name: 'lens-article',
      version: '3.0.0',
      documentFactory: defaultLensArticle
    }
  }})

var collabServer = new CollabServer({
  documentEngine: documentEngine // ,
  // authenticate: function (req, cb) {

  // },
  // enhanceCollaborator: function (req, cb) {

  // }
})
collabServer.bind(wss)

substance.post('/documents', function (req, res, next) {
  documentEngine.createDocument({
    documentId: 'N/A',
    schemaName: 'lens-article',
    info: req.body
  }, function (err, doc) {
    if (err) {
      console.log('ohonoes', err)
      return next(err)
    }
    console.log('apdsofkopasdkf', doc)
    console.log(err)
    return Fragment.find(doc.documentId).then(function (fragment) {
      fragment.data = doc.data
      console.log('THE FRAGMENT 1', fragment)
      return fragment.save()
    }).then(function (fragment) {
      console.log('THE FRAGMENT', fragment)
      return res.json(fragment)
    })
  })
})

substance.get('/documents/:id', function (req, res, next) {
  return documentEngine.getDocument({documentId: req.params.id}, function (err, result) {
    if (err) {
      return next(err)
    }
    return Fragment.find(req.params.id).then(function (fragment) {
      return res.json(fragment)
    })
  })
})

module.exports = substance
