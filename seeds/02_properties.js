exports.seed = async (knex) => {
  await knex.table('properties').del()
  await knex.table('properties').insert([
    {
      address: 'Valdlauci, 33 Meistaru iela, 300',
      user_id: 1
    },
    {
      address: 'Valdlauci, 33 Meistaru iela, 400',
      user_id: 2
    },
    {
      address: 'Valdlauci, 33 Meistaru iela, 500'
    }
  ])
}
