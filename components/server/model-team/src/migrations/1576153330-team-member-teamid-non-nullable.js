exports.up = knex =>
  knex.schema.alterTable('team_members', table => {
    table
      .uuid('team_id')
      .notNullable()
      .alter()
  })
