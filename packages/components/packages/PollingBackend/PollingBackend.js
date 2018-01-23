const sse = require('pubsweet-sse')

const PollingBackend = app => {
  const { Fragment, Collection, User } = app.locals.models
  let task

  const setTimer = (handler, milisecond, opts) => {
    if (task) {
      clearTimeout(task)
    }
    try {
      task = setTimeout(handler, milisecond, opts)
    } catch (e) {
      throw new Error('error')
    }
  }

  const unlocker = async opts => {
    // const { collectionId, fragmentId, user } = opts
    const { collectionId, fragmentId } = opts
    // console.log('user', user)
    const collection = await Collection.find(collectionId)
    if (!collection.fragments.includes(fragmentId)) {
      throw new Error(
        `collection ${collection.id} does not contain fragment ${fragmentId}`,
      )
    }
    const fragment = await Fragment.find(fragmentId)

    const patch = {
      id: fragment.id,
      rev: fragment.rev,
      lock: null,
    }

    await fragment.updateProperties(patch)
    await fragment.save()
    fragment.owners = await User.ownersWithUsername(fragment)
    const data = {}

    Object.keys(patch).forEach(key => {
      data[key] = fragment[key]
    })

    // console.log('fragment', fragment)

    sse.send({
      action: 'fragment:patch',
      data: { fragment: { id: fragment.id }, data },
    })
  }

  app.get(
    '/api/collections/:collectionId/fragments/:fragmentId',
    async (req, res, next) => {
      const { collectionId, fragmentId } = req.params
      const { username } = req.query

      try {
        if (!username) {
          res.status(400).json({ error: 'Username must be specified' })
          return
        }
        const user = await User.findByField('username', username).then(
          results => (results ? results[0] : null),
        )

        if (!user) {
          res.status(400).json({ error: 'User not found' })
          return
        }

        const opts = {
          collectionId,
          fragmentId,
          user,
        }

        setTimer(unlocker, 5000, opts)

        res.sendStatus(200)
      } catch (e) {
        throw new Error(e)
      }
    },
  )
}

module.exports = PollingBackend
