exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('username').notNull().unique()
    table.string('password').notNull()
    table.timestamps(true, true)
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('users')
}
