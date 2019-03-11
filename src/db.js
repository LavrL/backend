const { NODE_ENV = 'development' } = process.env

module.exports.knex = require('knex')(require('../knexfile')[NODE_ENV])
