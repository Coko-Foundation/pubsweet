import express from 'express'
import objectAssign from 'object-assign'
// import _ from 'lodash'
import User from './models/user'
import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-find'))

const api = express.Router()
const db = new PouchDB('../db/db' + process.env.NODE_ENV)

// Create user
api.post('/users', function (req, res) {
  const data = req.body
  const user = new User(objectAssign({_id: new Date().toISOString()}, data))

  user.save().then(function (response) {
    return res.status(201).json(response)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

// Get user
api.get('/users/:id', function (req, res) {
  User.findById(req.params.id).then(function (user) {
    return res.status(200).json(user)
  }).catch(function (error) {
    console.error(error)
    return res.status(503)
  })
})

// Destroy a user
api.delete('/users/:id', function (req, res) {
  User.findById(req.params.id).delete().then(function (user) {
    return res.status(200).json(user)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

// Update a fragment
api.put('/users/:id', function (req, res) {
  let user = User.findById(req.params.id)
  user = objectAssign(user, req.body)

  return db.put(user).then(function (result) {
    return res.status(200).json(result)
  }).catch(function (err) {
    console.error(err)
    return res.status(500)
  })
})

module.exports = api
