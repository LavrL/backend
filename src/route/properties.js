const Router = require('koa-router')
const body = require('koa-body')
const { ValidationError } = require('objection')
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

// ----------
router.post('/', body(), async (ctx) => {
    const { address, user_id } = ctx.request.body

    try {
        const properties = await PropertyModel.query()
            .insert({ address, user_id })

        ctx.status = 201
        ctx.body = {
            status: 'success',
            content: properties
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
// ----------

router.delete('/:address', async (ctx) => {
    const { user } = ctx.state
    const { address } = ctx.params

    const property = await PropertyModel.query()
        .delete().where({ user_id: user.id, address : address }).first()

    if (property === undefined) {
        return ctx.throw(404)
    }

    ctx.body = {
        status: 'success',
        content: property
    }
})
// ----------

router.put('/:address', body(), async (ctx) => {
    const { user } = ctx.state
    const { address } = ctx.params
    const { oldAddress, user_id } = ctx.request.body

    const property = await PropertyModel.query()
        .update({ address }).where({ user_id: user.id, address: oldAddress })

    if (property === undefined) {
        return ctx.throw(404)
    }

    ctx.body = {
        status: 'success',
        content: property
    }
})
// ----------

module.exports.properties = router
