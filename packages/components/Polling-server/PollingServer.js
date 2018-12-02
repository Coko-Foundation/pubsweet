const config = require('config')

const logger = require('@pubsweet/logger')

let lockedFragments = {}
const initCache = async Fragment => {
  const allFragments = await Fragment.all()
  for (let i = 0; i < allFragments.length; i += 1) {
    const currentFragment = allFragments[i]
    if (currentFragment.lock && currentFragment.lock !== null) {
      const { id } = currentFragment
      lockedFragments[id] = currentFragment.lock.editor.userId
    }
  }
  setInterval(() => cacheSync(Fragment), 8000)
}

const cacheSync = async Fragment => {
  logger.info(`Syncing cache`)
  const syncedLockedFragments = {}
  const allFragments = await Fragment.all()
  for (let i = 0; i < allFragments.length; i += 1) {
    const currentFragment = allFragments[i]
    if (currentFragment.lock && currentFragment.lock !== null) {
      const { id } = currentFragment
      syncedLockedFragments[id] = currentFragment.lock.editor.userId
    }
  }
  lockedFragments = syncedLockedFragments
}

const PollingServer = app => {
  const { Fragment, Collection, User } = app.locals.models
  const { authsome } = app.locals
  const tasks = {}
  const { timer } = config.get('@pubsweet/component-polling-server')
  const pollingTime = timer || 3000

  initCache(Fragment)

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

      logger.info(`Fragments Cache before ${JSON.stringify(lockedFragments)}`)
      delete lockedFragments[fragment.id]
      logger.info(`Fragments Cache after ${JSON.stringify(lockedFragments)}`)
      logger.info('Fragment stored')
      logger.info(
        `The value for fragment lock now is ${JSON.stringify(fragment.lock)}`,
      )
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

        // find in cache
        if (
          Object.keys(lockedFragments).length > 0 &&
          lockedFragments[fragmentId]
        ) {
          logger.info('Fragment found in cache')
          if (lockedFragments[fragmentId] === user.id) {
            logger.info(
              'Fragment found in cache and it is locked by the correct user',
            )
            setTimer(unlocker, pollingTime, opts)
            res.sendStatus(200)
          } else {
            logger.info(
              `Fragment found in cache but it is not locked from ${
                user.username
              }`,
            )
            res.sendStatus(403)
          }
        } else {
          const fragment = await Fragment.find(fragmentId)
          logger.info('Fragment found but not from cache')

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
                lockedFragments[fragment.id] = user.id
                logger.info('Fragment stored')
                logger.info(
                  `The value for fragment lock now is ${fragment.lock}`,
                )
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
            logger.info(`Setting timmer for ${pollingTime} ms`)
            setTimer(unlocker, pollingTime, opts)
            res.sendStatus(200)
          }
        }
      } catch (e) {
        logger.error(`In polling endpoint ${e}`)
        throw new Error(e)
      }
    },
  )
}

module.exports = PollingServer
