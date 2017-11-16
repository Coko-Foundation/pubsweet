const config = require('config')
const rp = require('request-promise-native')
const Busboy = require('busboy')
const temp = require('temp').track()
const fs = require('fs')
const path = require('path')
const promiseRetry = require('promise-retry')
const logger = require('@pubsweet/logger')

let inkConfig = config.get('pubsweet-component-ink-backend')
let inkEndpoint = inkConfig.inkEndpoint
let email = inkConfig.email
let password = inkConfig.password
let maxRetries = inkConfig.maxRetries || 60

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

// Get an access token
let getAuth = () => {
  return rp(authRequest).then(response => {
    return {
      accessToken: response.headers['access-token'],
      client: response.headers['client']
    }
  }).catch(
    err => {
      logger.error('INK API LOGIN FAILURE:', err)
      throw err
    }
  )
}

let defaultRecipeId = null
let recipeListUrl = inkEndpoint + '/api/recipes'

const getRecipeId = () => {
  if (defaultRecipeId) return Promise.resolve(defaultRecipeId)

  const listRequest = auth => ({
    method: 'GET',
    uri: recipeListUrl,
    headers: {
      'uid': email,
      'access-token': auth.accessToken,
      'client': auth.client
    }
  })

  return getAuth().then(
    auth => rp(listRequest(auth))
  ).then(
    response => Promise.resolve(JSON.parse(response))
  ).then(
    response => {
      const defaultRecipe = response.recipes.find(
        recipe => recipe.name === 'Editoria Typescript' // XSweet recipe
      )
      if (!defaultRecipe) throw new Error('could not get default recipe from INK')
      defaultRecipeId = defaultRecipe.id
      return Promise.resolve(defaultRecipeId)
    }
  )
}

getRecipeId()

const inkRecipeUrl = () => getRecipeId().then(
  recipeId => Promise.resolve(inkEndpoint + '/api/recipes/' + recipeId + '/execute')
)

const healthCheckRequest = auth => inkRecipeUrl().then(
  recipeUrl => {
    const opts = {
      uri: recipeUrl,
      method: 'OPTIONS',
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'access-token, client, expiry, token-type, uid',
        'Origin': 'http://ink.coko.foundation',
        'access-token': auth.accessToken,
        'client': auth.client
      }
    }
    return Promise.resolve(opts)
  }
)

const uploadRequest = (data, auth) => inkRecipeUrl().then(
  recipeUrl => {
    const opts = {
      uri: recipeUrl,
      method: 'POST',
      headers: {
        'uid': email,
        'access-token': auth.accessToken,
        'client': auth.client
      },
      formData: {
        input_files: [data]
      }
    }
    return Promise.resolve(opts)
  }
)

// Upload file to INK and execute the recipe
const uploadToInk = data => auth => uploadRequest(
  data, auth
).then(
  rp
).then(
  response => Promise.resolve([auth, JSON.parse(response)])
)

// Check if INK is alive and well
const checkInk = auth => healthCheckRequest(auth).then(
  rp
).then(
  response => {
    return Promise.resolve(auth)
  }
).catch(
  err => {
    throw err
  }
)

const retryFor30SecondsUntil200 = (uri, auth) => {
  const downloadRequest = {
    method: 'GET',
    uri: uri,
    headers: {
      'uid': email,
      'access-token': auth.accessToken,
      'client': auth.client
    }
  }

  return promiseRetry(
    (retry, number) => {
      return rp(downloadRequest).catch(retry)
    },
    { retries: maxRetries, factor: 1, minTimeout: 3000 }
  )
}

const downloadUrl = (chainId, relPath) => inkEndpoint +
  '/api/process_chains/' +
  chainId +
  '/download_output_file?relative_path=' +
  relPath +
  '.html'

const downloadFromInk = ([auth, response]) => {
  if (response.process_chain.input_file_manifest.length === 0) {
    throw new Error('The INK server gave a malformed response (no input files in the process chain)')
  }
  const relPath = path.basename(response.process_chain.input_file_manifest[0].path, '.docx')
  const url = downloadUrl(response.process_chain.id, relPath)
  return retryFor30SecondsUntil200(url, auth)
}

var InkBackend = function (app) {
  app.use('/api/ink', (req, res, next) => {
    var fileStream = new Busboy({ headers: req.headers })

    const handleErr = err => {
      logger.error('ERROR CONVERTING WITH INK', err)
      next(err)
    }

    fileStream.on('file', (fieldname, file, filename, encoding, contentType) => {
      var stream = temp.createWriteStream()
      file.pipe(stream)

      file.on('end', () => {
        stream.end()

        var fileOpts = {
          value: fs.createReadStream(stream.path),
          options: {
            filename: filename,
            contentType: contentType
          }
        }

        getAuth().then(
          checkInk
        ).then(
          uploadToInk(fileOpts)
        ).then(
          downloadFromInk
        ).then(
          response => res.send(response)
        ).catch(handleErr)
      })
    })

    fileStream.on('error', handleErr)

    req.pipe(fileStream)
  })
}

module.exports = InkBackend
