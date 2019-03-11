const Router = require('koa-router')
const { auth } = require('../middleware/auth')
const { properties } = require('./properties')

const router = new Router({ prefix: '/me' })

router.use(auth())

router.get('/', async (ctx) => {
  const { user } = ctx.state

  ctx.body = {
    status: 'success',
    content: {
      ...user,
      password: undefined // remove password from result :D
    }
  }
})

router.post('/', async (ctx) => {
  ctx.throw(501)
})

// put properties under user
router.use(properties.routes())

module.exports.me = router
