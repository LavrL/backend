const { STATUS_CODES } = require('http')

module.exports.error = async (ctx, next) => {
  try {
    await next()

    if (ctx.status === 404) {
      ctx.throw(404)
    }
  } catch (error) {
    ctx.app.emit('error', error, ctx)

    if (error.headers) {
      ctx.set(error.headers)
    }

    const code = typeof error.status === 'number' ? error.status : 500

    ctx.status = code
    ctx.type = 'application/json'
    ctx.body = {
      status: 'error',
      code,
      message: error.message || STATUS_CODES[code],
      stack: ctx.app.env === 'development' && error.expose ? error.stack : undefined
    }
  }
}
