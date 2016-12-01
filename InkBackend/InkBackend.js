var proxy = require('express-http-proxy')
var config = require('config')
var rp = require('request-promise-native')
var Busboy = require('busboy')
var temp = require('temp').track()
var fs = require('fs')

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

let uploadRequest = function(data, auth) {
  return {
    uri: inkRecipe,
    method: 'POST',
    headers: {
      'uid': email,
      'access-token': auth.accessToken,
      'client': auth.client
    },
    formData: {
      input_file: data
    }
  }
}

// Upload file to INK and execute the recipe
let uploadToInk = function (data, auth) {
  return rp(uploadRequest(data, auth)).then(response => {
    return [auth, response]
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
  return rp(healthCheckRequest(auth)).then(response => {
    console.log('Health check complete')
    return auth
  })
}

let retryFor30SecondsUntil200 = (uri, auth) => {
  let downloadRequest = {
    method: 'GET',
    uri: uri,
    headers: {
      'uid': email,
      'access-token': auth.accessToken,
      'client': auth.client
    }
  }

  let wait = (time) => { return new Promise(resolve => setTimeout(resolve, time)) }

  let doTry = function(max, timeout) {
    console.log('ONE BEAR', max)

    if (max <= 0) return Promise.reject('Maximum tries reached')

    return rp(downloadRequest).then((response) => {
      console.log('TWO BEAR', max)
      return response
    }).catch((err) => {
      wait(timeout).then(() => doTry(max - 1, timeout))
    })
  }

  return doTry(30, 1000)
}


var InkBackend = function(app) {
  app.use('/ink', function (req, res, next) {
    var fileStream = new Busboy({headers: req.headers})

    fileStream.on('file', function(fieldname, file, filename, encoding, contentType) {
      var stream = temp.createWriteStream()
      file.pipe(stream)

      file.on('end', () => {
        stream.end()
        var file = {
          value: fs.createReadStream(stream.path),
          options: {
            filename: filename,
            contentType: contentType
          }
        }

        getAuth()
          .then((auth) => checkInk(auth))
          .then((auth) => {
            return uploadToInk(file, auth)
          }).then(([auth, response]) => {
            response = JSON.parse(response)
            return retryFor30SecondsUntil200(response.process_chain.output_file_path, auth)
          }).then(response => {
            console.log('THREE BEAR', response)
            res.send(response)
          })
      })
    })


    fileStream.on('error', function (err) {
      console.log(err)
    })

    req.pipe(fileStream)
  })
}





















module.exports = InkBackend