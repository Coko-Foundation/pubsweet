var proxy = require('express-http-proxy')
var config = require('config')
var rp = require('request-promise-native')
var Busboy = require('busboy')

let inkConfig = config.get('pubsweet-component-ink-backend')
let inkEndpoint = inkConfig.inkEndpoint
let email = inkConfig.email
let password = inkConfig.password
let inkRecipe = inkEndpoint + '/api/recipes/6/execute' // XSweet recipe

let authRequest = {
  uri: inkEndpoint + '/api/auth/sign_in',
  method: 'POST',
  body: {
    email: email,
    password: password
  },
  json: true,
  headers: {
    'Accept': 'application/vnd.ink.1'
  },
  resolveWithFullResponse: true
}

let healthCheckRequest = function (auth) {
  return {
    uri: inkRecipe,
    method: 'OPTIONS',
    headers: {
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'access-token, client, expiry, token-type, uid',
      'Origin': 'http://ink.coko.foundation',
      'access-token': auth.accessToken,
      'client': auth.client
    }
  }
}

let uploadRequest = function(file, auth) {
  return {
    uri: inkRecipe,
    method: 'POST',
    headers: {
      'uid': email,
      'access-token': auth.accessToken,
      'client': auth.client
    },
    formData: {
      input_file: file
    }
  }
}

// Upload file to INK and execute the recipe
let uploadToInk = function (file, auth) {
  console.log(uploadRequest(file, auth))
  return rp(uploadRequest(file, auth)).then(response => {
    console.log('INK RESPONSE', response)
    return response
  })
}

// Get an access token
let getAuth = () => {
  return rp(authRequest).then(response => {
    return {
      accessToken: response.headers['access-token'],
      client: response.headers['client']
    }
  })
}
// Check if INK is alive and well
let checkInk = (auth) => {
  // return getAccessToken.then(accessToken => {
  //   healthCheckRequest.headers['access-token'] = accessToken
  //   console.log(healthCheckRequest)
  return rp(healthCheckRequest(auth)).then(response => {
    console.log('Health check complete')
    return auth
  })
}

var InkBackend = function(app) {
  app.use('/ink', function (req, res, next) {
    var busboy = new Busboy({headers: req.headers})

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('FILE', file)

      getAuth()
        .then((auth) => checkInk(auth))
        .then((auth) => uploadToInk(file, auth))
        .then(response => {
          console.log('HERE I AM')
        })
    })

    busboy.on('error', function (err) {
      console.log(err)
    })

    req.pipe(busboy)
  })
}

module.exports = InkBackend