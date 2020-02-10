exports.up = async knex => {
  const { User, Identity } = require('@pubsweet/models')
  const users = await User.query()

  const saves = []

  users.forEach(user => {
    const identity = new Identity({
      type: 'local',
      passwordHash: user.passwordHash,
      email: user.email,
      userId: user.id,
      name: user.username,
      isDefault: true,
    })

    saves.push(identity.save())
  })

  await Promise.all(saves)

  return knex.schema.table('users', table => {
    table.dropColumn('email')
    table.dropColumn('password_hash')
  })
}
