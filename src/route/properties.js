const Router = require('koa-router')
const { PropertyModel } = require('../model/property.model')

const router = new Router({ prefix: '/properties' })

router.get('/', async (ctx) => {
  const { user } = ctx.state

  const properties = await PropertyModel.query()
    .where({ user_id: user.id })
    .orderBy('created_at')

  ctx.body = {
    status: 'success',
    content: properties
  }
})

router.put('/', async (ctx) => {
  ctx.throw(501)
})

router.get('/:propertyId', async (ctx) => {
  const { user } = ctx.state
  const { propertyId } = ctx.params

  const property = await PropertyModel.query()
    .where({ user_id: user.id, id: propertyId })
    .first()

  if (property === undefined) {
    return ctx.throw(404)
  }

  ctx.body = {
    status: 'success',
    content: property
  }
})

router.post('/:propertyId', async (ctx) => {
  ctx.throw(501)
})

module.exports.properties = router
