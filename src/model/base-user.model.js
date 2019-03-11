const { BaseModel } = require('./base.model')

class BaseUserModel extends BaseModel {
  static get tableName () {
    return 'users'
  }

  $set (json) {
    return super.$set({
      ...json,
      passwordConfirmation: undefined
    })
  }

  $formatJson (json) {
    return super.$formatJson({
      ...json,
      password: undefined
    })
  }
}

module.exports.BaseUserModel = BaseUserModel
