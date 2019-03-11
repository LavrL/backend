const { UserModel } = require('../model/user.model')

const headers = {
  'WWW-Authenticate': 'Basic realm="Restricted Area", charset="UTF-8"'
}

module.exports.auth = () => async (ctx, next) => {
  const { authorization } = ctx.headers

  if (authorization === undefined) {
    return ctx.throw(401, undefined, { headers })
  }

  const [, base64] = authorization.split(' ')
  const [username, password] = Buffer.from(base64, 'base64').toString().split(':')

  const user = await UserModel.query()
    .where({ username, password })
    .first()

  if (user === undefined) {
    return ctx.throw(401, undefined, { headers })
  }

  ctx.state.user = user

  return next()
}
