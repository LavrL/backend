const { Model } = require('objection')
const { BasePropertyModel } = require('./base-property.model')
const schema = require('../schema/read-property')

class PropertyModel extends BasePropertyModel {
  static get jsonSchema () {
    return schema
  }

  static get relationMappings () {
    const UserModel = require('./user.model')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'properties.user_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports.PropertyModel = PropertyModel
