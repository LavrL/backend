module.exports.ssl = (ctx, next) => {
  const secure = ctx.secure || ctx.headers['x-forwarded-proto'] === 'https'

  if (secure || ctx.app.env === 'development') {
    return next()
  }

  if (ctx.method === 'GET') {
    ctx.status = 301
    return ctx.redirect(`https://${ctx.host}${ctx.url}`)
  }

  return ctx.throw(400, 'Please use HTTPS when communicating with this server.')
}
