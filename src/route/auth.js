const Router = require('koa-router')
const body = require('koa-body')
const { ValidationError } = require('objection')
const { auth } = require('../middleware/auth')
const { CreateUserModel } = require('../model/create-user.model')

const router = new Router()

router.post('/authenticate', auth(), async (ctx) => {
  ctx.status = 204
})

router.put('/:pass', body(), async (ctx) => {
    const { user } = ctx.state
    const { pass } = ctx.params
    const { oldPass, user_id } = ctx.request.body
    console.log('user.id = '+ user)

    const property = await CreateUserModel.query()
        .update({ pass }).where({ password: oldPass })

    if (property === undefined) {
        return ctx.throw(404)
    }

    ctx.body = {
        status: 'success',
        content: property
    }
})

router.post('/register', body(), async (ctx) => {
  const { username, password, passwordConfirmation, name } = ctx.request.body

  try {
    const user = await CreateUserModel
      .query()
      .insert({ username, password, passwordConfirmation, name })

    ctx.status = 201
    ctx.body = {
      status: 'successs',
      content: user
    }
  } catch (e) {
    console.log(e)
    if (e instanceof ValidationError) {
      console.log(e)
      ctx.status = 400
      ctx.body = {
        status: 'error',
        content: []
      }
    }

    throw e
  }
})

module.exports.auth = router
