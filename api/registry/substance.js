'use strict'
const express = require('express')
const substance = express.Router()

const defaultLensArticle = require('lens/model/defaultLensArticle')

const ChangeStore = require('substance/collab/ChangeStore')
const DocumentStore = require('substance/collab/DocumentStore')
const DocumentEngine = require('substance/collab/DocumentEngine')

// global.$ = require('substance/util/jquery')

var store = new DocumentStore().seed({
  'test-doc': {
    documentId: 'test-doc',
    schemaName: 'lens-article',
    schemaVersion: '3.0.0',
    version: 1 // document has one change = version 1
  }
})

var changeStore = new ChangeStore().seed({
  'test-doc': defaultLensArticle.createChangeset()
})

var documentEngine = new DocumentEngine({
  documentStore: store,
  changeStore: changeStore,
  schemas: {
    'lens-article': {
      name: 'lens-article',
      version: '3.0.0',
      documentFactory: defaultLensArticle
    }
  }})

substance.post('/documents', function (req, res) {

})

substance.get('/documents/:id', function (req, res, next) {
  documentEngine.getDocument({documentId: req.params.id}, function (err, result) {
    if (err) {
      return next(err)
    }

    result.docId = req.params.id
    return res.json(result)
  })
})

module.exports = substance
