const Router = require('koa-router')
const body = require('koa-body')
const { auth } = require('../middleware/auth')
const { properties } = require('./properties')
const { CreateUserModel } = require('../model/create-user.model')

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

router.put('/', body(), async (ctx) => {
    const { username } = ctx.state
    const { password, user_id } = ctx.request.body

    const user = await CreateUserModel.query()
        .update({ password }).where({ username: user_id })

    if (user === undefined) {
        return ctx.throw(404)
    }

    ctx.body = {
        status: 'success',
        content: username
    }
})

router.post('/', async (ctx) => {
  ctx.throw(501)
})

// put properties under user
router.use(properties.routes())

module.exports.me = router
