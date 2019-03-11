const Router = require('koa-router')

const router = new Router()

router.get('/', ctx => ctx.redirect('v1'))
router.get('/favicon.ico', ctx => {
  ctx.status = 204
})
router.get('/v1', (ctx) => {
  ctx.body = { status: 'success' }
})

module.exports.index = router
