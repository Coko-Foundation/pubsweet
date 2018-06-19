const logger = require('@pubsweet/logger')

const PollingServer = app => {
  const { Fragment, Collection, User } = app.locals.models
  const { authsome } = app.locals
  const tasks = {}

  const setTimer = (handler, milisecond, opts) => {
    logger.info(
      `Initiating timmer for FragmentID:${opts.fragmentId}, CollectionID:${
        opts.collectionId
      }, User:${opts.user.username}`,
    )
    logger.info(`# of running tasks: ${Object.keys(tasks).length}`)
    if (Object.keys(tasks).length > 0) {
      logger.info(`Clearing previous timmer for FragmentID:${opts.fragmentId}`)
      clearTimeout(tasks[opts.fragmentId])
      delete tasks[opts.fragmentId]
    }
    logger.info(`Task for FragmentID:${opts.fragmentId} cleared`)
    logger.info(`# of running tasks: ${Object.keys(tasks).length}`)
    try {
      logger.info(`New timmer for FragmentID:${opts.fragmentId}`)
      tasks[opts.fragmentId] = setTimeout(handler, milisecond, opts)
    } catch (e) {
      logger.error(`In setTimmer: ${e}`)
      throw new Error(e)
    }
  }

  const unlocker = async opts => {
    const { collectionId, fragmentId } = opts
    logger.info(
      `Initialize unlocker for FragmentID:${opts.fragmentId}, CollectionID:${
        opts.collectionId
      }`,
    )
    try {
      const collection = await Collection.find(collectionId)

      if (!collection.fragments.includes(fragmentId)) {
        logger.error(
          `Collection ${collectionId} does not contain fragment ${fragmentId}`,
        )
        throw new Error(
          `collection ${collection.id} does not contain fragment ${fragmentId}`,
        )
      }
      logger.info('Collection found')

      const fragment = await Fragment.find(fragmentId)
      logger.info('Fragment found')

      if (fragment.lock === null) return

      const patch = {
        id: fragment.id,
        lock: null,
      }

      logger.info('Fragment Update')
      await fragment.updateProperties(patch)
      await fragment.save()
      logger.info('Fragment stored')
      logger.info(`The value for fragment lock now is ${fragment.lock}`)
      // fragment.owners = await User.ownersWithUsername(fragment)

      const data = {}

      Object.keys(patch).forEach(key => {
        data[key] = fragment[key]
      })

      const update = data
      app.locals.sse.send({
        action: 'fragment:patch',
        data: { fragment: { id: fragment.id }, update },
      })
      logger.info('SSE sent')

      logger.info(`# of running tasks: ${Object.keys(tasks).length}`)
      if (Object.keys(tasks).length > 0) {
        delete tasks[opts.fragmentId]
      }
      logger.info(`Task for FragmentID:${fragmentId} cleared`)
      logger.info(`# of running tasks: ${Object.keys(tasks).length}`)
    } catch (err) {
      logger.error(`In unlocker for fragment ${fragmentId}, error: ${err}`)
      throw new Error(err)
    }
  }

  app.get(
    '/api/collections/:collectionId/fragments/:fragmentId',
    async (req, res, next) => {
      const { collectionId, fragmentId } = req.params
      const { username } = req.query
      logger.info(
        `Initiating polling for fragment with id ${fragmentId} of the collection with id ${collectionId} for user ${username}`,
      )
      try {
        if (!username) {
          logger.error('Username not provided')
          res.status(400).json({ error: 'Username must be specified' })
          return
        }
        const user = await User.findByField('username', username).then(
          results => (results ? results[0] : null),
        )

        if (!user) {
          logger.error(`User ${username} not found`)
          res.status(400).json({ error: 'User not found' })
          return
        }

        const opts = {
          collectionId,
          fragmentId,
          user,
        }

        const fragment = await Fragment.find(fragmentId)
        logger.info('Fragment found')

        if (fragment) {
          if (fragment.lock === null) {
            const patch = {
              id: fragmentId,
              lock: {
                editor: { username: user.username, userId: user.id },
                timestamp: new Date(),
              },
            }
            const object = {
              current: fragment,
              update: patch,
            }
            const condition = await authsome.can(user.id, 'PATCH', object)
            if (condition) {
              logger.info('Fragment Update')
              await fragment.updateProperties(patch)
              await fragment.save()
              logger.info('Fragment stored')
              logger.info(`The value for fragment lock now is ${fragment.lock}`)
              const data = {}
              Object.keys(patch).forEach(key => {
                data[key] = fragment[key]
              })
              const update = data
              app.locals.sse.send({
                action: 'fragment:patch',
                data: { fragment: { id: fragment.id }, update },
              })
              logger.info('SSE sent')
            }
          } else if (fragment.lock !== null || fragment.lock !== undefined) {
            if (fragment.lock.editor.userId !== user.id) {
              res.sendStatus(403)
            }
          }
        }
        logger.info(`Setting timmer for 5000 ms`)
        setTimer(unlocker, 5000, opts)

        res.sendStatus(200)
      } catch (e) {
        logger.error(`In polling endpoint ${e}`)
        throw new Error(e)
      }
    },
  )
}

module.exports = PollingServer
