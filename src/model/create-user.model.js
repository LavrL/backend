const { BaseUserModel } = require('./base-user.model')
const schema = require('../schema/create-user')

class CreateUserModel extends BaseUserModel {
  static get jsonSchema () {
    return schema
  }

  $set (json) {
    return super.$set({
      ...json,
      passwordConfirmation: undefined
    })
  }
}

module.exports.CreateUserModel = CreateUserModel
