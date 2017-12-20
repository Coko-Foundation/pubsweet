const fs = require('fs')
const path = require('path')
const logger = require('@pubsweet/logger')
const Busboy = require('busboy')
const config = require('config')
const rp = require('request-promise-native')
const temp = require('temp')
const Pusher = require('pusher-js')

// rp.debug = true

const inkConfig = config.get('pubsweet-component-ink-backend')

// Generate the absolute URL
const inkUrl = path => `${inkConfig.inkEndpoint}api/${path}`

// Connect to the INK Pusher/Slanger endpoint
const connectToPusher = ({ appKey, ...options }) => new Pusher(appKey, options)

const pusher = connectToPusher(inkConfig.pusher)

// Sign in
const authorize = () =>
  rp({
    method: 'POST',
    uri: inkUrl('auth/sign_in'),
    formData: {
      email: inkConfig.email,
      password: inkConfig.password,
    },
    headers: {
      Accept: 'application/vnd.ink.1',
    },
    resolveWithFullResponse: true,
  }).then(res => ({
    client: res.headers.client,
    'access-token': res.headers['access-token'],
  }))

// Upload file to INK and execute the recipe
const upload = (recipeId, inputFile, auth) =>
  rp({
    method: 'POST',
    uri: inkUrl(`recipes/${recipeId}/execute`),
    headers: {
      uid: inkConfig.email,
      ...auth,
    },
    formData: {
      input_files: [inputFile],
    },
    json: true,
    timeout: 60 * 60 * 1000, // 3600 seconds
  })

// Download the output file
const download = (chainId, auth, outputFileName) =>
  rp({
    uri: inkUrl(`process_chains/${chainId}/download_output_file`),
    qs: {
      relative_path: outputFileName,
    },
    headers: {
      uid: inkConfig.email,
      ...auth,
    },
  })

// Find the ID of a recipe by name
const findRecipeId = (name = 'Editoria Typescript', auth) =>
  rp({
    method: 'GET',
    uri: inkUrl('recipes'),
    headers: {
      uid: inkConfig.email,
      ...auth,
    },
    json: true,
  }).then(data => {
    const recipe = data.recipes.find(recipe => recipe.name === name)

    return recipe ? recipe.id : null
  })

const process = async (inputFile, options) => {
  const auth = await authorize().catch(err => {
    logger.error('INK API LOGIN FAILURE:', err.message)
    throw err
  })

  // either use the recipe id from the configuration or search for it by name
  const recipeId =
    inkConfig.recipes[options.recipe] ||
    (await findRecipeId(options.recipe, auth))
  if (!recipeId) throw new Error('Unknown recipe')

  const response = await upload(recipeId, inputFile, auth).catch(err => {
    logger.error('INK API UPLOAD FAILURE:', err.message)
    throw err
  })

  const chain = response.process_chain

  return new Promise((resolve, reject) => {
    // subscribe to the "process chain execution" channel
    const channel = pusher.subscribe('process_chain_execution')

    // wait for a "subscription succeeded" event
    channel.bind('pusher:subscription_succeeded', () => {
      const handler = data => {
        if (data.chain_id !== chain.id) return

        logger.info('Processing completed', data)

        // unbind the event handler
        channel.unbind('processing_completed', handler)

        // unsubscribe from the channel
        pusher.unsubscribe('process_chain_execution')

        const manifest = chain.input_file_manifest

        if (manifest.length === 0) {
          reject(
            new Error(
              'The INK server gave a malformed response (no input files in the process chain)',
            ),
          )
        }

        // backwards compatibility
        if (!options.outputFileName) {
          options.outputFileName = `${path.basename(
            manifest[0].path,
            '.docx',
          )}.html`
        }

        // download the output file
        logger.info(
          `Downloading output file ${options.outputFileName} from chain ${
            chain.id
          }`,
        )

        download(chain.id, auth, options.outputFileName)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            logger.error('Error downloading from INK:', error.message)
            reject(error)
          })
      }

      // handle "processing completed" events on this channel
      channel.bind('processing_completed', handler)
    })

    channel.bind('pusher:subscription_error', status => {
      logger.error('Pusher subscription error', status)
      reject(new Error('There was an error subscribing to the INK channel'))
    })
  })
}

const InkBackend = app => {
  // TODO: authentication on this route
  app.use('/api/ink', (req, res, next) => {
    const fileStream = new Busboy({ headers: req.headers })

    fileStream.on(
      'file',
      (fieldname, file, filename, encoding, contentType) => {
        const stream = temp.createWriteStream()

        stream.on('finish', () => {
          const inputFile = {
            value: fs.createReadStream(stream.path),
            options: { filename, contentType },
          }

          logger.info(`Uploading file to INK for processing`)

          process(inputFile, req.query)
            .then(converted => {
              res.json({ converted })

              // clean up temp file
              fs.unlink(stream.path, () => {
                logger.info('Deleted temporary file', stream.path)
              })
            })
            .catch(err => {
              logger.error('ERROR CONVERTING WITH INK:', err.message)
              next(err)
            })
        })

        file.pipe(stream)

        file.on('end', () => {
          stream.end()
        })
      },
    )

    fileStream.on('error', err => {
      logger.error(err)
      next(err)
    })

    req.pipe(fileStream)
  })
}

module.exports = InkBackend
