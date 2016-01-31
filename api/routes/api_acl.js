'use strict'
const express = require('express')

const api = express.Router()

// Create a role
api.post('/roles', function (req, res) {

})

// Assign a user to a role
api.post('/ace', function (req, res) {

})

// Update role membership
api.put('/ace/:id', function (req, res) {

})

// Remove a role from a user
api.delete('/ace/:id', function (req, res) {

})

module.exports = api
