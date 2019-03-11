const Router = require('koa-router')

const router = new Router({ prefix: '/teapot' })

router.get('/', ctx => ctx.throw(418, undefined, { expose: false }))

module.exports.teapot = router
