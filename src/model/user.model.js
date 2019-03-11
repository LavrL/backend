const { Model } = require('objection')
const { BaseUserModel } = require('./base-user.model')
const schema = require('../schema/user')

class UserModel extends BaseUserModel {
  static get jsonSchema () {
    return schema
  }

  static get relationMappings () {
    const PropertyModel = require('./property.model')

    return {
      properties: {
        relation: Model.HasManyRelation,
        modelClass: PropertyModel,
        join: {
          from: 'users.id',
          to: 'properties.user_id'
        }
      }
    }
  }
}

module.exports.UserModel = UserModel
