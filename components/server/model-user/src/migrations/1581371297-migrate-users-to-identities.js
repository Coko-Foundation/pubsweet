/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
// eslint-disable-next-line import/no-extraneous-dependencies
const { transaction } = require('objection')
const logger = require('@pubsweet/logger')

exports.up = async knex => {
  const { User, Identity } = require('@pubsweet/models')
  const users = await User.query()

  for (const user of users) {
    // To make the migration idempotent
    if (!user.defaultIdentityId) {
      try {
        await transaction(User.knex(), async trx => {
          const identity = await new Identity({
            type: 'local',
            passwordHash: user.passwordHash,
            email: user.email,
            userId: user.id,
            name: user.username,
          }).save(trx)
          return user
            .$query(trx)
            .patchAndFetch({ defaultIdentityId: identity.id })
        })
      } catch (e) {
        logger.error(e)
      }
    }
  }

  return knex.schema.table('users', table => {
    table.dropColumn('email')
    table.dropColumn('password_hash')
    table.dropColumn('fragments')
    table.dropColumn('collections')
  })
}
