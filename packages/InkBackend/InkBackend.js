const fs = require('fs')
const path = require('path')
const logger = require('@pubsweet/logger')
const Busboy = require('busboy')
const config = require('config')
const rp = require('request-promise-native')
const temp = require('temp')

// rp.debug = true

const inkConfig = config.get('pubsweet-component-ink-backend')

// Generate the absolute URL
const inkUrl = path => inkConfig.inkEndpoint + 'api/' + path

// Sign in
const authorize = () => rp({
  method: 'POST',
  uri: inkUrl('auth/sign_in'),
  formData: {
    email: inkConfig.email,
    password: inkConfig.password
  },
  headers: {
    'Accept': 'application/vnd.ink.1'
  },
  resolveWithFullResponse: true
}).then(res => ({
  'client': res.headers['client'],
  'access-token': res.headers['access-token']
}))

// Upload file to INK and execute the recipe
const upload = (recipeId, inputFile, auth) => rp({
  method: 'POST',
  uri: inkUrl('recipes/' + recipeId + '/execute'),
  headers: {
    uid: inkConfig.email,
    ...auth
  },
  formData: {
    input_files: [inputFile]
  },
  json: true,
  timeout: 60 * 60 * 1000 // 3600 seconds
})

// Download the output file (keep trying if there's a 404 response, until it's ready)
const download = async (chain, auth, outputFileName) => {
  const manifest = chain.input_file_manifest

  if (manifest.length === 0) {
    throw new Error('The INK server gave a malformed response (no input files in the process chain)')
  }

  const interval = inkConfig.interval || 1000 // try once per second

  const maxRetries = inkConfig.maxRetries || 300 // retry for up to 5 minutes

  const uri = inkUrl('process_chains/' + chain.id + '/download_output_file')

  const qs = {
    relative_path: outputFileName || path.basename(manifest[0].path, '.docx') + '.html'
  }

  const headers = {
    uid: inkConfig.email,
    ...auth
  }

  for (let i = 0; i < maxRetries; i++) {
    // delay
    await new Promise(resolve => setTimeout(resolve, interval))

    const response = await rp({
      uri,
      qs,
      headers,
      simple: false,
      resolveWithFullResponse: true
    }).catch(error => {
      logger.error('Error downloading from INK:', error.message)
      throw error
    })

    // a successful request: return the data
    if (response.statusCode === 200) {
      return response.body
    }

    // not a 404 response - stop trying
    if (response.statusCode !== 404) {
      break
    }
  }

  throw new Error('Unable to download the output from INK')
}

const findRecipeId = (recipeKey = 'Editoria Typescript', auth) => rp({
  method: 'GET',
  uri: inkUrl('recipes'),
  headers: {
    uid: inkConfig.email,
    ...auth
  },
  json: true
}).then(data => {
  const recipe = data.recipes.find(recipe => recipe.name === recipeKey)

  return recipe ? recipe.id : null
})

const process = async (inputFile, options) => {
  const auth = await authorize().catch(err => {
    logger.error('INK API LOGIN FAILURE:', err.message)
    throw err
  })

  // either use the recipe id from the configuration or search for it by name
  const recipeId = inkConfig.recipes[options.recipe] || await findRecipeId(options.recipe, auth)
  if (!recipeId) throw new Error('Unknown recipe')

  const response = await upload(recipeId, inputFile, auth).catch(err => {
    logger.error('INK API UPLOAD FAILURE:', err.message)
    throw err
  })

  return download(response.process_chain, auth, options.outputFileName)
}

const InkBackend = function (app) {
  // TODO: authentication on this route
  app.use('/api/ink', (req, res, next) => {
    const fileStream = new Busboy({ headers: req.headers })

    fileStream.on('file', (fieldname, file, filename, encoding, contentType) => {
      const stream = temp.createWriteStream()

      stream.on('finish', () => {
        const inputFile = {
          value: fs.createReadStream(stream.path),
          options: { filename, contentType }
        }

        process(inputFile, req.query).then(converted => {
          res.json({ converted })

          // clean up temp file
          fs.unlink(stream.path, () => {
            logger.info('Deleted temporary file', stream.path)
          })
        }).catch(err => {
          logger.error('ERROR CONVERTING WITH INK:', err.message)
          next(err)
        })
      })

      file.pipe(stream)

      file.on('end', () => {
        stream.end()
      })
    })

    fileStream.on('error', err => {
      logger.error(err)
      next(err)
    })

    req.pipe(fileStream)
  })
}

module.exports = InkBackend
