exports.seed = async (knex) => {
  await knex('users').del()
  await knex('users').insert([
    {
      name: 'Alexey Reznikov',
      username: 'alexey.reznikov',
      password: 'reznikov'
    },
    {
      name: 'Lavrentiy Lemberskis',
      username: 'lavrentiy.lemberskis',
      password: 'lemberskis'
    },
    {
      name: 'John Cena',
      username: 'john.cena',
      password: 'cena'
    }
  ])
}
